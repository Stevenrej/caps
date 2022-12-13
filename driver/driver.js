'use strict';


let eventPool = require('../eventPool');



function driverPickUp(payload) {
  setTimeout(() => {
    console.log(`Driver: Order has been picked up and is in transit`, payload.orderId);

    eventPool.emit('TRANSIT', payload);
  }, 1500);
}


function driverDelivered(payload) {
  setTimeout(() => {
    console.log(`Driver: Order has been delivered at:`, payload.address
    );
    eventPool.emit('DELIVERED', payload);
  }, 3000);
}

module.exports = { driverPickUp, driverDelivered};


