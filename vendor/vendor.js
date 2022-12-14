'use strict';


const Chance = require('chance');
const chance = new Chance();

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/hub');


function pickUp (payload = null) {
  payload = payload ? payload : {
    store: chance.company(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log(`Vendor:  new incoming order, sending info to the driver `, payload);
  socket.emit('PICK_UP',  payload );
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
