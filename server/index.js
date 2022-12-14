'use strict';

require('dotenv').config();
const { Server } = require('socket.io');


const server = new Server(3001);


function logger(event, payload) {
  const time = new Date();
  console.log('EVENT:', { event, time, payload });
}


const hub = server.of('/hub');

hub.on('connection', (socket) => {
  console.log('connected on', socket.id);
socket.on('PICK_UP', (payload) => {
  console.log('Server PICK_UP event', payload);
  hub.emit('PICK_UP', payload); 
});
socket.on('TRANSIT', (payload) => {
  console.log('Server TRANSIT event', payload);
});
socket.on('DELIVERED', (payload) => {
  console.log('Server DELIVERED event', payload);
  hub.emit('DELIVERED', payload);
});
})

