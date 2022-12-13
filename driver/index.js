'use strict';

let driverHandler = require('./driver');

module.exports = (payload) => {
  setTimeout(() => {
    driverHandler(payload);
  
  }, 1000);
};

