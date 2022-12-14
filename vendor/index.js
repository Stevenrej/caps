'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/hub');

const { pickUp, delivered } = require('./vendor');

socket.on('DELIVERED', delivered);


setInterval(() => {
  console.log('-----------new interval begins-----------');
  pickUp();
}, 5000);