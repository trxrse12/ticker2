/**
 * @name ticker2-v1-api
 * @description This module packages the Ticker2 API.
 */
const ServerResponse = require('fwsp-server-response');
const hydraExpress = require('hydra-express');
const injectHandlerDependencies = require('../utils/inject-handler-dependencies');
const retrieveMoversHandler = require('../handlers/stocks/retrieve-movers');
const ValidationError = require('../validators/errors/validation-error');
const retrieveMoversEngine = require('../engines/stocks/movers');

const client = {}; // potential injection point for elasticsearch: new elasticsearch.Client({,...})

const handlerToEngineMap = new Map([
  [retrieveMoversHandler, retrieveMoversEngine],
]);

/* eslint-disable no-unused-vars */
const hydra = hydraExpress.getHydra();
/* eslint-enable no-unused-vars */
const express = hydraExpress.getExpress();

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
    injectHandlerDependencies(retrieveMoversHandler, client, handlerToEngineMap, ValidationError)(req, res);
  });

module.exports = api;
