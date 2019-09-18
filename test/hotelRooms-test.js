import chai from 'chai';
const expect = chai.expect;

import HotelRooms from '../src/HotelRooms';

describe('HotelRooms', function () {
  let room1, room2, room3, hotelRooms;
  beforeEach(() => {
    room1 = {
      number: 2,
      roomType: "Cardboard Box",
      bidet: false,
      bedSize: "2 by 2",
      numBeds: 1,
      costPerNight: 137.66
    }
    room2 = {
      number: 3,
      roomType: "The Golden Penthouse",
      bidet: true,
      bedSize: "3 floors",
      numBeds: 17,
      costPerNight: 6.66
    }
    room3 = {
      number: 1,
      roomType: "Guard Hut",
      bidet: false,
      bedSize: "single cot",
      numBeds: 2,
      costPerNight: 480.15
    }
    hotelRooms = new HotelRooms();
    hotelRooms.addRoom(room1);
    hotelRooms.addRoom(room2);
    hotelRooms.addRoom(room3);
  })

  it('should be a function', () => {
    expect(HotelRooms).to.be.a('function');
  })

  it('It should have 3 rooms', () => {
    expect(hotelRooms.rooms.length).to.equal(3);
  })

  it('Should show cost of selected rooms', () => {
    expect(hotelRooms.getRoomIncome([2, 3])).to.eql(144.32);
  })

  it('Find rooms based on their room Number', () => {
    expect(hotelRooms.findRoomsByNumber([3])).to.eql([{
      number: 3,
      roomType: "The Golden Penthouse",
      bidet: true,
      bedSize: "3 floors",
      numBeds: 17,
      costPerNight: 6.66
    }]);
  })
});