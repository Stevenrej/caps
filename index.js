'use strict';

const eventPool = require('./eventPool');
require('./vendor');
require('./driver');

function logger(event, payload) {
 const time = new Date();
 console.log('EVENT:', {event, time, payload});
}

// listen to all events
eventPool.on('PICK_UP',(payload) => logger('PICK_UP', payload));
eventPool.on('DELIVERED',(payload) => logger('DELIVERED', payload));
eventPool.on('TRANSIT',(payload) => logger('TRANSIT', payload));






