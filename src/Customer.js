class Customer {
  constructor(id, name, room, orders) {
    this.id = id;
    this.name = name;
    this.room = room;
    this.orders = orders;
  }

  bookRoom(room) {
    if (this.room === undefined) {
      this.room = room;
    } else {
      return "Room already booked"
    }
  }

  unBookRoom() {
    this.room = undefined;
  }

  purchaseRoomService() {

  }

  upgradeRoom() {

  }

//calculate Total Bill
//past Bookings
//totalBillbyDate
//totalroomServiceByDate
}

export default Customer;