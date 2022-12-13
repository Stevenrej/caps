'use strict';

const eventPool = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();



function pickUp (payload = null) {
  payload = payload ? payload : {
    store: chance.company(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log(`Vendor:  new incoming order, sending info to the vendor `, payload);
  eventPool.emit('PICK_UP',  payload );
}

function delivered (payload) {
  setTimeout(() => {
  console.log(`Vendor: Thank you ${payload.customer}, your order has been delivered to `, payload.address);

}, 1000);
};

module.exports = {
pickUp,
delivered,
}
