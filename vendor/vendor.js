'use strict';

const stamp = require('../index')

let eventPool = require('../eventPool');

 function pickUp (payload) {
  setTimeout(() => {
    console.log(`Vendor: we have an order tell the driver to pick up`, payload, stamp);

    eventPool.emit('PICK_UP', payload);
  }, 7000);
};

eventPool.on('DELIVERED', delivered)

function delivered (payload) {
  setTimeout(() => {
  console.log(`Vendor: Thank you ${payload.newOrder}, your order has been delivered to `, payload, stamp);

}, 2000);
};

module.exports = {
pickUp,
delivered,
}
