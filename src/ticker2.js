/**
* @name Ticker2
* @summary Ticker2 Hydra Express service entry point
* @description Retrieves ticker stocks from Yahoo finance
*/

// require('dotenv').config();
const config = require('fwsp-config');
const hydraExpress = require('hydra-express');
const { version } = require('../package.json');
const ticker2V1Routes = require('./routes/ticker2-v1-routes');

/**
* Load configuration file and initialize hydraExpress app
*/
config.init('src/config/config.json')
  .then(() => {
    config.version = version;
    return hydraExpress.init(config.getObject(), version, () => {
      hydraExpress.registerRoutes({
        '/v1/ticker2': ticker2V1Routes,
      });
    });
  })
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
