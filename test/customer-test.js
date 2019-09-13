import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer';

describe('Customer', function () {
  let customer;
  beforeEach(() => {
    let room = {
      number: 2,
      bidet: true,
      bedSize: "full",
      roomType: "single room",
      numBeds: 1,
      costPerNight: 228.01
    }
    customer = new Customer(1, 'Steve', room);
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  })

  it('Customer should have an id, name and room', () => {
    expect(customer.id).to.equal(1);
    expect(customer.name).to.equal('Steve');
    expect(customer.room.number).to.equal(2);
  })

  it('Customer shoudn\'t be able to book a room if they already have one', () => {
    expect(customer.bookRoom({})).to.equal('Room already booked');
  })

  it('Customer should be able to un-book their room', () => {
    customer.unBookRoom();
    expect(customer.room).to.equal(undefined);
  })
});
