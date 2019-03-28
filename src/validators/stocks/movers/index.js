const Ajv = require('ajv');

const tickerAnswerSchema = require('../../../schema/stocks/ticker2-answer');
const tickerStockClassSchema = require('../../../schema/stocks/ticker2-stock-class');
const tickerStockItem = require('../../../schema/stocks/ticker2-stock-class');

const ValidationError = require('../../errors/validation-error');
const generateValidationErrorMessage = require('../../errors/messages');

function validate(req) {
  const ajvValidate = new Ajv()
    .addSchema([tickerAnswerSchema, tickerStockClassSchema])
    .compile(tickerAnswerSchema);
  const valid = ajvValidate(req.body);
  if (!valid) {
    // Return validationError
    return new ValidationError(generateValidationErrorMessage(ajvValidate.errors));
  }
  return true;
}

module.exports = validate;
