'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const Queue = require('./queue');
const clientQueue = new Queue();



const server = new Server(3001);

const hub = server.of('/hub');





hub.on('connection', (socket) => {
  console.log('connected on', socket.id);

  socket.on('JOIN', (queueId) => {
    socket.join(queueId);
    console.log('joined room', queueId);
    socket.emit('JOIN', queueId);
  });


  socket.on('PICK_UP', (payload) => {
    console.log('Server PICK_UP event', payload);
    console.log('we are here-------')
    socket.broadcast.emit('PICK_UP', payload);
    console.log('we are here 2')
  });

  socket.on('RECEIVED', (payload) => {
    let currentQueue = clientQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('no queue');
    }
    let deliver = currentQueue.remove(payload.messageId);
    console.log('This was removed', deliver);
  })

  socket.on('TRANSIT', (payload) => {
    console.log('Server TRANSIT event', payload);
  });


  socket.on('DELIVERED', (payload) => {
    console.log('Server DELIVERED event', payload);

    let currentQueue = clientQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = clientQueue.store(payload.queueId, new Queue());
      currentQueue = clientQueue.read(queueKey);
    }

    currentQueue.store(payload.messageId, payload);


    socket.broadcast.emit('DELIVERED', payload);
  });

  socket.on('GET_ALL', (payload) => {
    console.log('This happened Vendor');
    let currentQueue = clientQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(messageId => {
        socket.emit('DELIVERED', currentQueue.remove(messageId));
      });
    }
  });


})

