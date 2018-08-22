'use strict';

const fs = require('fs');
const paths = {
  dotenv: '.env'
}

function getEnvFile(env) {
  var dotenvFiles = [
    `${paths.dotenv}.${env}.local`,
    `${paths.dotenv}.${env}`,
    env !== 'test' && `${paths.dotenv}.local`,
    paths.dotenv,
  ].filter(Boolean);

  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      require('dotenv-expand')(
        require('dotenv').config({
          path: dotenvFile,
        })
      );
    }
  });

}

const REACT_APP = /^XHS_/i;

function getClientEnvironment(env) {
  getEnvFile(env)
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      }, {
        NODE_ENV: env
      }
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return {
    raw,
    stringified
  };
}

module.exports = getClientEnvironment;
