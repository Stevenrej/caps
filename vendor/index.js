'use strict';

const eventPool = require('../eventPool');
const { pickUp, delivered } = require('./vendor');

eventPool.on('DELIVERED', delivered);


setInterval(() => {
  console.log('-----------new interval begins-----------');
  pickUp();
}, 5000);