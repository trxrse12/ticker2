const Ajv = require('ajv');
const tickerAnswerSchema = require('../../../schema/stocks/ticker2_answer');
const ValidationError = require('../../errors/validation-error');
const generateValidationErrorMessage = require('../../errors/messages');

function validate(req) {
  const ajvValidate = new Ajv()
    .addSchema([tickerAnswerSchema])
    .compile(tickerAnswerSchema);
  const valid = ajvValidate(req.body);
  if (!valid) {
    // Return validationError
    return new ValidationError(generateValidationErrorMessage(ajvValidate.errors));
  }
  return true;
}

module.exports = validate;
