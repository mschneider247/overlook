class Customer {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.room = user.room;
    this.orders = user.orders;
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