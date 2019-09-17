import $ from 'jquery';
import './css/base.scss';
import Customer from './Customer';
import BookingRepo from './BookingRepo';
import HotelRooms from './HotelRooms';
import RoomService from './RoomService';
import domUpdates from "./domUpdates";

const usersFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
  .then(data => data.json());
const roomsFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
  .then(data => data.json());
const bookingsFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
  .then(data => data.json());
const roomServicesFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices")
  .then(data => data.json());

const allCustomers = [];
let currentCustomer;
const bookingRepo = new BookingRepo();
const hotelRooms = new HotelRooms();
const roomService = new RoomService();
let today = "2019/09/16";

Promise.all([usersFetch, roomsFetch, bookingsFetch, roomServicesFetch]).then(data => {
  data[0].users.forEach(user => {
    let newCustomer = new Customer(user);
    allCustomers.push(newCustomer);
  });
  data[1].rooms.forEach(room => {
    hotelRooms.addRoom(room);
  });
  data[2].bookings.forEach(booking => {
    bookingRepo.addBooking(booking);
  });
  data[3].roomServices.forEach(service => {
    roomService.addService(service);
  });
});

setTimeout(() => {
  bookingRepo.setTotalRooms();
  bookingRepo.setRoomsAndCustomersBookedToday(today);
  console.log("All Customers", allCustomers);
  console.log("hotelRooms.rooms", hotelRooms.rooms);
  console.log("bookingRepo.bookings", bookingRepo.bookings);
  console.log("booked Room Numbers", bookingRepo.bookedRoomNumbers);
  console.log("booked Customer IDs", bookingRepo.bookedCustomerIDs);
  console.log("Total rooms", bookingRepo.totalRooms);
  console.log("roomService.services", roomService.services);
  console.log(hotelRooms.getRoomIncome(bookingRepo.bookedRoomNumbers))
  // need to reach into room service now, what does it even look like?
  // how is the data structured?  So I need that same array from bookings
  // wait no... thats for rooms booked.  I need to look at users booked
  // for today and then use that to check the total Cost of their room
  // service...
  // need to set up room service
  //
  console.log("need to reach into roomService now send it today?")
  domUpdates.initiateMain(today, (bookingRepo.totalRooms - bookingRepo.bookedRoomNumbers.length));
}, 1750);

domUpdates.initiateTabs();

$('.tabs-nav a').on('click', function (event) {
  event.preventDefault();
  let that = this;
  domUpdates.tabNavigation(that);
});

$('#search-customers-btn').on('click', function() {
  domUpdates.clearCustomerNameInput();
  let nameInput = $('#search-customers').val();
  let foundCustomer = checkifNameExists(nameInput)
  if (foundCustomer !== undefined) {
    currentCustomer = foundCustomer;
    domUpdates.showCustomerSelectBtn();
  } else {
    domUpdates.appendNoCustomerFound();
  }
});

$('#customer__ask-to-select').on('click', function () {
  domUpdates.appendCustomerInfo(currentCustomer);
  domUpdates.showCustomerSearchBtn()
});

$('#customer__add-btn').on('click', function () {
  domUpdates.clearCustomerNameInput();
  let newName = domUpdates.grabNewCustomerName();
  let checkedName = checkifNameExists(newName);
  if (checkedName === undefined) {
    let newCustomer = new Customer({
      id: allCustomers.length + 1,
      name: newName,
    });
    allCustomers.push(newCustomer);
    currentCustomer = newCustomer;
    domUpdates.clearNoCustomerError();
    domUpdates.appendCustomerInfo(currentCustomer);
  } else {
    currentCustomer = checkedName;
    domUpdates.appendCustomerInfo(currentCustomer);
  }
});

function checkifNameExists(name) {
  return allCustomers.find(customer => {
    return (customer.name).toLowerCase().includes((name).toLowerCase());
  });
}