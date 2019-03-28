import superagent from 'superagent';
import { When, Then } from 'cucumber';



/* eslint-disable no-unused-vars */
let request;
let result;
let error;
let payload;
/* eslint-enable no-unused-vars */

When(/^the client sends a GET request to \/stocks\/daily$/, function () {
  request = superagent('GET', 'localhost:3000/v1/ticker2/stocks/daily');
});

When(/^sends the request$/, function (cb) {
  request
    .then((response) => {
      result = response.res;
      cb();
    })
    .catch((errResponse) => {
      error = errResponse.response;
      cb();
    });
});

Then(/^the API should respond with a 400 HTTP status code$/, function () {
  if (error.statusCode !== 400) {
    throw new Error();
  }
});

Then(/^the API should respond with a 200 HTTP status code$/, function () {
  if (result.statusCode !== 200) {
    throw new Error();
  }
});

Then(/^the payload of the response should be a JSON object$/, function () {
  const response = result || error;

  // check Content-Type Header
  const contentType = response.headers['Content-Type']
    || response.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Response not of Content-Type application/json');
  }

  // check it is valid JSON
  try {
    payload = JSON.parse(response.text);
  } catch (e) {
    throw new Error('Response not a valid JSON object');
  }
});


Then(/^the format should follow a typical ajv definition as per the response json spec file$/, function () {

});
