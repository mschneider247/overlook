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

  findTotalRooms() {
    let roomNums = this.bookings.reduce((acc, booking) => {
      if (!acc.includes(booking.number)) {
        acc.push(booking.number);
      }
      return acc;
    }, []).sort((a,b) => a - b);
    this.roomNumbers = roomNums;
    this.totalRooms = roomNums.length;
  }

  roomsAvailableToday(today) {
    let bookedRooms = this.bookings.filter(booking => {
      return booking.date === today
    });
    this.bookedRoomNumbers = bookedRooms.map(room => {
      return room.number;
    });
    return this.totalRooms - bookedRooms.length
  }
}

export default BookingRepo;