'use strict';


const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/hub');

const Chance = require('chance');
const chance = new Chance();



socket.emit('JOIN', '1-206-flowers');


socket.emit('GET_ALL', { queueId: '1-206-flowers'});


function delivered (payload) {

  console.log(`Vendor: Thank you , your order has been delivered`, payload);
    socket.emit('RECEIVED', payload);
};

socket.on('DELIVERED', delivered);

function outputPayload () {
  return {
    store: '1-206-flowers',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    queueId: '1-206-flowers',
    messageId: chance.guid(),
    driverId: 'OurPS',
  };
};




setInterval(() => {
  console.log('Vendor:  new incoming order, sending info to the driver sent' );
  let payload = outputPayload();
  console.log(payload);
  socket.emit('PICK_UP', payload);
}, 5000);