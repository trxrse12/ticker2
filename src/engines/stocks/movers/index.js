const unirest = require('unirest');
const ValidationError = require('../../../validators/errors/validation-error');
const validate = require('../../../validators/stocks/movers/index');

async function retrieveMovers(req) {
  let engineResult = {};

  const validationResults = validate(req);
  if (validationResults instanceof ValidationError) {
    return Promise.reject(validationResults);
  }
  await unirest.get(`${process.env.API_URL}/market/get-movers?region=US&lang=en`)
    .header('X-RapidAPI-Key', process.env.API_KEY)
    .then((result) => {
      engineResult = result;
    });
  return engineResult;
}

module.exports = retrieveMovers;
