'use strict';

const eventPool = require('../eventPool');
const {driverDelivered, driverPickUp} = require('./driver');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Driver', () => {

  it('picks up order and emits in transit as expected', () => {
    const payload = {
      store: 'Big Rock Emporium',
      orderId: '12345',
      customer: 'Jim',
      address: 'address',
    };
    driverPickUp(payload);
    expect(console.log).toHaveBeenCalledWith(`Driver: Order has been picked up and is in transit`, payload.orderId);
    expect(eventPool.emit).toHaveBeenCalledWith('TRANSIT', payload);
  });

  it('delivers as expected', () => {
    const payload = {
      store: 'Big Rock Emporium',
      orderId: '12345',
      customer: 'Jim',
      address: 'address',
    };
    driverDelivered(payload);
    expect(console.log).toHaveBeenCalledWith(`Driver: Order has been delivered at:`, payload.address);
    expect(eventPool.emit).toHaveBeenCalledWith('DELIVERED', payload);
  });
});
