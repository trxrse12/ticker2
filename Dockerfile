FROM node
MAINTAINER Remus SEPP

EXPOSE 3000
RUN mkdir -p /usr/ticker2
WORKDIR /usr/ticker2
ADD . /usr/ticker2

RUN wget http://download.redis.io/redis-stable.tar.gz && \
  tar xvzf redis-stable.tar.gz && \
  cd redis-stable && \
  make && \
  mv src/redis-server /usr/bin/ && \
  cd .. && \
  rm -r redis-stable && \
  npm install -g concurrently

RUN rm -rf /usr/ticker2/node_modules
RUN npm install yarn
RUN cd /usr/ticker2 && yarn install

CMD concurrently "/usr/bin/redis-server --bind '0.0.0.0' &" "sleep 5s; cd /usr/ticker2 && yarn run serve &"

