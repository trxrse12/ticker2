Feature: Retrieve stocks by ID
    Clients should be able to send a request to our API in order to retrieve the stock price for a certain listed company.
  The API should also be able to validate the structure of the payload and respond with an error if invalid

  Scenario: Retrieve daily movers
    When the client sends a GET request to /stocks/daily
    And sends the request
    Then the API should respond with a 200 HTTP status code
    And the payload of the response should be a JSON object
    And the format should follow a typical ajv definition as per "ticker_response.js"
