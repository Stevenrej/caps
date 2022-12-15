'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/hub');




function driverPickUp(payload) {

    console.log(`Driver: Order has been picked up and is in transit`, payload.orderId);
    socket.emit('TRANSIT', payload);

}


function driverDelivered(payload) {

    console.log(`Driver: Order has been delivered at:`, payload.address
    );
    socket.emit('DELIVERED', payload);

}

// clientConnect.publish('CATCH_UP_DRIVER', { queueId: 'vendor'});

socket.on('PICK_UP', driver);

function driver(payload){
  setTimeout(() => {
    driverPickUp(payload);
    driverDelivered(payload);
  }, 7000);
}
