'use strict';


// const Chance = require('chance');
// const chance = new Chance();
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/hub');





// function outputPayload () {
//   return {
//     store: '1-206-flowers',
//     orderId: chance.guid(),
//     customer: chance.name(),
//     address: chance.address(),
//     queueId: '1-206-flowers',
//     messageId: '1-206-flowers'
//   };
// };



function delivered (payload) {

  console.log(`Vendor: Thank you , your order has been delivered`, payload);
    socket.emit('RECEIVED', payload);
};

module.exports = {
outputPayload,
delivered,
}
