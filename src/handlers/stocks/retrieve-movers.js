/* eslint-disable no-unused-vars */
const unirest = require('unirest');
const injectHandlerDependencies = require('../../utils/inject-handler-dependencies');


/* eslint-enable no-unused-vars */

function retrieveMovers(req, res) {
  res.status(200);
  res.set('Content-Type', 'application/json');
  res.json({ message: 'First response from my service' });
}

module.exports = retrieveMovers;