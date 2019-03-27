const config = require('fwsp-config');

const fs = require('fs');

const { spawn } = require('child_process');

const tag = `trxrse/${process.env.npm_package_name}:${process.env.npm_package_version}`;
const modes = {
  build: ['docker', ['build', '-t', tag, process.cwd()], { stdio: 'inherit' }],
  run: ['docker', ['run', '-it', tag], { stdio: 'inherit' }],
  up: ['docker', ['run', '-d', tag], { detached: true }],
};


const getDockerfile = (exposePort, logger = false) => `
      FROM node:6.3
      MAINTAINER Remus Sepp trxrse@gmail.com
      EXPOSE ${exposePort}
      ARG NPM_TOKEN
      RUN mkdir -p /usr/src/app
      WORKDIR /usr/src/app
      ADD . /usr/src/app
      RUN echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc
      ${logger ? 'RUN npm install pino-elasticsearch -g' : ''}
      RUN npm install --production
      RUN rm -f .npmrc
      CMD ["npm", "start"]
      `;
const run = (mode) => {
  console.log(`Running '${[modes[mode][0], ...modes[mode][1]].join(' ')}'`);
  const docker = spawn(...modes[mode]);
  docker.on('close', code => console.log(`docker ${mode} exited with code ${code}`));
};

const mode = process.argv[2];
if (!modes[mode]) {
  console.log(`No such mode '${mode}'. Available modes: ${Object.keys(modes).join(', ')}.`);
  // return;
}
if (mode === 'build') {
  if (!fs.existsSync('config/config.json')) {
    console.log('config/config.json must exist to build docker image');
    process.exit(1);
  }
  if (fs.existsSync('Dockerfile')) {
    run(mode);
  } else {
    console.log('No Dockerfile found, loading config.json and generating one...');
    config.init('./config/config.json')
      .then(() => {
        const Dockerfile = getDockerfile(
          config.hydra.servicePort,
          !!(config.hydra.plugins && config.hydra.plugins.logger),
        ).split(/\n/).map(v => v.trim()).filter(v => v.length)
          .join('\n');
        console.log(Dockerfile);
        fs.writeFile('Dockerfile', Dockerfile, (err) => {
          if (err) {
            console.log('Error writing Dockerfile', err);
            process.exit(1);
          } else {
            console.log('Wrote Dockerfile');
            run(mode);
          }
        });
      });
  }
} else {
  run(mode);
}
