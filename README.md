# ticker2-service

Retrieves ticker stocks from Yahoo finance

## Pre-installation

It's recommended that [NVM](https://github.com/creationix/nvm) be used to manage NodeJS versions.
The project includes an .nvmrc which specifies NodeJS 6.2.1

## Installation
1. git clone https://github.com/trxrse12/ticker2.git
2. cd ticker2
3. save the provided API key file as .env;
4. docker build -t ticker2:0.0.1 .
5. docker run  -p 80:3000 --env-file .env ticker2:0.0.1

```

## Trial

In the host's browser open: http://localhost/v1/ticker2/stocks/daily
