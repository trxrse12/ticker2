import superagent from 'superagent';
import { When, Then } from 'cucumber';

let request;
/* eslint-disable no-unused-vars */
let result;
/* eslint-enable no-unused-vars */
let error;
let payload;

When(/^the client sends a GET request to \/stocks\/daily$/, function () {
  request = superagent('GET', 'localhost:3000/stocks/daily');
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

Then(/^the API should respond with a 200 HTTP status code$/, function (cb) {
  if (error.statusCode !== 400) {
    throw new Error();
  }
});

Then(/^the payload of the response should be a JSON object$/, function (cb) {
  cb(null, 'pending');
});

Then(/^contains a message property which says "Incorrect company index"$/, function (cb) {
  cb(null, 'pending');
});

Then(/^the format should follow a typical ajv definition as per "ticker_response.js"$/, function (cb) {
  cb(null, 'pending');
});
