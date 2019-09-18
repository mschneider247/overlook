class BookingRepo {
  constructor() {
    this.bookings = [];
    this.roomNumbers = [];
    this.bookedRoomNumbers = [];
    this.bookedCustomerIDs = [];
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

  setRoomsAndCustomersBookedToday(today) {
    let bookedRooms = this.bookings.filter(booking => {
      return booking.date === today
    });
    this.bookedRoomNumbers = bookedRooms.map(room => {
      return room.roomNumber;
    });
    this.bookedCustomerIDs = bookedRooms.map(room => {
      return room.userID;
    });
  }

  mostPopularBookedDates() {
    let popularBookDates = this.bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = 1;
      } else {
        acc[booking.date]++;
      }
      return acc;
    }, {});
    return this.getMostPopularDays(popularBookDates);
  }

  getMostPopularDays(popularBookDates) {
    let bookingDates = Object.keys(popularBookDates)
    let greatestValue = 0;
    bookingDates.forEach(date => {
      if (popularBookDates[date] > greatestValue) {
        greatestValue++;
      }
    });
    let popularDates = [];
    bookingDates.forEach(date => {
      if (popularBookDates[date] === greatestValue) {
        popularDates.push(date);
      }
    });
    return popularDates;
  }
}

export default BookingRepo;