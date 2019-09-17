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
let today = "2019/09/10";

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
  console.log("roomService.services", roomService.services);
  console.log("booked Room Numbers", bookingRepo.bookedRoomNumbers);
  console.log("booked Customer IDs", bookingRepo.bookedCustomerIDs);
  let roomIncomeToday = hotelRooms.getRoomIncome(bookingRepo.bookedRoomNumbers);
  let servicesIncomeToday = roomService.getServicesIncomeByDate(bookingRepo.bookedCustomerIDs, today)
  let todaysIncome = (roomIncomeToday + servicesIncomeToday).toFixed(2);
  domUpdates.initiateMain(today, (bookingRepo.totalRooms - bookingRepo.bookedRoomNumbers.length), todaysIncome);
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