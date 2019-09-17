class BookingRepo {
  constructor() {
    this.bookings = [];
    this.roomNumbers = [];
    this.bookedRoomNumbers = [];
    this.totalRooms = 0;
  }

  addBooking(booking) {
    this.bookings.push(booking);
  }

  setTotalRooms() {
    let roomNums = this.bookings.reduce((acc, booking) => {
      if (!acc.includes(booking.roomNumber)) {
        acc.push(booking.roomNumber);
      }
      return acc;
    }, []).sort((a,b) => a - b);
    this.roomNumbers = roomNums;
    this.totalRooms = roomNums.length;
  }

  setRoomsBookedToday(today) {
    let bookedRooms = this.bookings.filter(booking => {
      return booking.date === today
    });
    this.bookedRoomNumbers = bookedRooms.map(room => {
      return room.roomNumber;
    });
  }
}

export default BookingRepo;