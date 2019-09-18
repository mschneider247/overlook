import chai from 'chai';
const expect = chai.expect;

import BookingRepo from '../src/BookingRepo';

describe('BookingRepo', function () {
  let booking1, booking2, booking3,bookingRepo;
  beforeEach(() => {
    booking1 = {
      userID: 4,
      date: '2019/09/16',
      roomNumber: 14,
    }
    booking2 = {
      userID: 2,
      date: '2019/09/15',
      roomNumber: 24,
    }
    booking3 = {
      userID: 7,
      date: '2019/09/14',
      roomNumber: 37,
    }
    bookingRepo = new BookingRepo();
    bookingRepo.addBooking(booking1);
    bookingRepo.addBooking(booking2);
    bookingRepo.addBooking(booking3);
  })

  it('should be a function', () => {
    expect(BookingRepo).to.be.a('function');
  })

  it('It should have 3 bookings', () => {
    expect(bookingRepo.bookings.length).to.equal(3);
  })

  it('Should be able to set properties of total rooms and all room numbers', () => {
    bookingRepo.setTotalRooms();
    expect(bookingRepo.totalRooms).to.equal(3);
    expect(bookingRepo.roomNumbers).to.eql([14, 24, 37]);
  })

  it.skip('Should be able to set the rooms and users booked today', () => {
    customer.unBookRoom();
    expect(customer.room).to.equal(undefined);
  })
});