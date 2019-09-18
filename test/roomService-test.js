import chai from 'chai';
const expect = chai.expect;

import RoomService from '../src/RoomService';

describe('RoomService', function () {
  let service1, service2, service3, roomService;
  beforeEach(() => {
    service1 = {
      userID: 4,
      date: '2019/09/16',
      food: "Five day old Tuna",
      totalCost: 15.09
    }
    service2 = {
      userID: 2,
      date: '2019/09/15',
      food: "Boiled onion skin",
      totalCost: 73.14
    }
    service3 = {
      userID: 7,
      date: '2019/09/14',
      food: "Mr. Swank's swanky stuff",
      totalCost: 52.11
    }
    roomService = new RoomService();
    roomService.addService(service1);
    roomService.addService(service2);
    roomService.addService(service3);
  })

  it('should be a function', () => {
    expect(RoomService).to.be.a('function');
  })

  it('It should have 3 services', () => {
    expect(roomService.services.length).to.equal(3);
  })

  it('Should show services by date', () => {
    expect(roomService.getServicesByDate('2019/09/15')).to.eql([{
      userID: 2,
      date: '2019/09/15',
      food: "Boiled onion skin",
      totalCost: 73.14
    }]);
  })

  it('Should show income by user and date', () => {
    expect(roomService.getServicesIncomeByDate([2], '2019/09/15')).to.eql(73.14);
  })
});