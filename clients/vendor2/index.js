'use strict';


const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/hub');

const Chance = require('chance');
const chance = new Chance();


socket.emit('JOIN', 'acme-widgets');


socket.emit('GET_ALL', { queueId: 'acme-widgets'});


function delivered (payload) {

  console.log(`Vendor: Thank you , your order has been delivered`, payload);
    socket.emit('RECEIVED', payload);
};

socket.on('DELIVERED', delivered);

function outputPayload () {
  return {
    store: 'acme-widgets',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    queueId: 'acme-widgets',
    messageId: chance.guid(),
  };
};




setInterval(() => {
  console.log('Message from Vendor:  new incoming order, sending info to the driver sent' );
  let payload = outputPayload();
  console.log(payload);
  socket.emit('PICK_UP', payload);
}, 3000);