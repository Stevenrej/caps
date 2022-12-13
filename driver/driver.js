'use strict';


let eventPool = require('../eventPool');

module.exports = (payload) => {

  setTimeout(() => {
  console.log(`Driver: Recived  ${payload}`  );

  eventPool.emit('TRANSIT', payload);
}, 2000);



    setTimeout(() => {
      console.log(`Driver: Order has been delivered` 
      );
      eventPool.emit('DELIVERED', payload);
    }, 6000);
  };


