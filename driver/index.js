'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/hub');


let {driverPickUp, driverDelivered} = require('./driver');

socket.on('PICK_UP', driver);

function driver(payload){
  driverPickUp(payload);
  driverDelivered(payload);
}
