/**
 * @name ticker2-v1-api
 * @description This module packages the Ticker2 API.
 */
const hydraExpress = require('hydra-express');
/* eslint-disable no-unused-vars */
const hydra = hydraExpress.getHydra();
/* eslint-enable no-unused-vars */
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');

const serverResponse = new ServerResponse();
express.response.sendError = function (err) {
  serverResponse.sendServerError(this, { result: { error: err } });
};
express.response.sendOk = function (result) {
  serverResponse.sendOk(this, { result });
};

const api = express.Router();

api.get('/stocks/daily',
  (req, res) => {
    // res.sendOk({ greeting: 'Welcome to Hydra Express!' });
    res.status(200).end();
    // res.set('Content-Type', 'text/plain');
    // res.json({ message: 'First response from my service' });
  });

module.exports = api;
