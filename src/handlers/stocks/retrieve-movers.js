/* eslint-disable no-unused-vars */
const unirest = require('unirest');
const injectHandlerDependencies = require('../../utils/inject-handler-dependencies');

/* eslint-enable no-unused-vars */

function retrieveMovers(req, res) {
  unirest.get(`${process.env.API_URL}/market/get-movers?region=US&lang=en`)
    .header('X-RapidAPI-Key', process.env.API_KEY)
    .end((result) => {
      console.log(result.status, result.headers, result.body);
    });
  res.status(200);
  res.set('Content-Type', 'application/json');
  res.json({ message: 'First response from my service' });
}

module.exports = retrieveMovers;
