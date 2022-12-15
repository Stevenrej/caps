'use strict';

const eventPool = require('../eventPool');
const driverHandler = require('./driver');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Handle Driver', () => {
  test('emit transit', () => {
    driverHandler({payload});
    expect(console.log).toHaveBeenCalledWith(`Driver: Recived  ${payload}`);
    expect(eventPool.emit).toHaveBeenCalledWith('TRANSIT'), payload;
  });
});
