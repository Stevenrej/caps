'use strict';

const eventPool = require('../eventPool');
let {driverPickUp, driverDelivered} = require('./driver');

eventPool.on('PICK_UP', driver);

function driver(payload){
  driverPickUp(payload);
  driverDelivered(payload);
}
