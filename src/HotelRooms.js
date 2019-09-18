class HotelRooms {
  constructor() {
    this.rooms = [];
  }

  addRoom(room) {
    this.rooms.push(room);
  }

  getRoomIncome(occupiedRooms) {
    return this.rooms.reduce((acc, room) => {
      if (occupiedRooms.includes(room.number)) {
        acc += room.costPerNight
      }
      return acc;
    }, 0);
  }

  findRoomsByNumber(roomNumbers) {
    return this.rooms.filter(room => {
      return roomNumbers.includes(room.number);
    })
  }
}

export default HotelRooms;