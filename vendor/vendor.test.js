'use strict';

const { pickUp, delivered } = require('./vendor');
const eventPool = require('../eventPool');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Vendor', () => {
  it('emits order as expect', () => {
    const payload = {
      store: 'Big Rock Emporium',
      orderId: '12345',
      customer: 'Jim',
      address: 'address',
    };
    pickUp(payload);
    expect(console.log).toHaveBeenCalledWith(`Vendor:  new incoming order, sending info to the vendor `, payload);
    expect(eventPool.emit).toHaveBeenCalledWith('PICK_UP', payload);
  });
  it('thanks the driver', () => {
    delivered({customer: 'Jim'});
    expect(console.log).toHaveBeenCalledWith(`Vendor: Thank you ${payload.customer}, your order has been delivered to`, payload.address );
  });
});