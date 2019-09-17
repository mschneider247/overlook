class HotelRooms {
  constructor() {
    this.rooms = [];
  }

  addRoom(room) {
    this.rooms.push(room);
  }

  getRoomIncome(occupiedRooms) {
    console.log("occupiedRooms", occupiedRooms);
    let log = this.rooms.reduce((acc, room) => {
      if (occupiedRooms.includes(room.roomNumber)) {
        acc += room.costPerNight
      }
      return acc;
    }, 0)
    console.log("accumulated total",log);
  }
}

export default HotelRooms;