'use strict';

const eventPool = require('./eventPool');
const Chance = require('chance');

 
 
// prints date & time in YYYY-MM-DD HH:MM:SS format


// require handlers
const { pickUp, delivered} = require('./vendor/vendor');
const driverHandler = require('./driver/index');


// listen to all events
eventPool.on('PICK_UP', driverHandler);
eventPool.on('NEW_ORDER', pickUp);
eventPool.on('DELIVERED', delivered);
eventPool.on('TRANSIT', inTransit);

const chance = new Chance();


let order = {
  store: chance.company(),
  orderID: chance.guid(),
  customer: chance.name(),
  address: chance.address(),
};


function inTransit (payload) {
  setTimeout(() => {
    console.log(`To User: Order is in transit `, payload);
    console.timeStamp();
  }, 1000);
  };




setInterval(() => {
  console.log('-------new interval begins---------');
  const newOrder = order;
  console.log(`this is a new incoming order, sending info to the vendor `, newOrder);
  eventPool.emit('NEW_ORDER',  newOrder );

}, 7000);

