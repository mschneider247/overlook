import $ from 'jquery';
import './css/base.scss';
import Customer from './Customer';
import BookingRepo from './BookingRepo';
import HotelRooms from './HotelRooms';
import RoomService from './RoomService';
import domUpdates from "./domUpdates";

const allCustomers = [];
let currentCustomer;
const bookingRepo = new BookingRepo();
const hotelRooms = new HotelRooms();
const roomService = new RoomService();
let today = "2019/09/10";

const usersFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
  .then(data => data.json());
const roomsFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
  .then(data => data.json());
const bookingsFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
  .then(data => data.json());
const roomServicesFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices")
  .then(data => data.json());

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
  bookingRepo.setTotalRooms();
  bookingRepo.setRoomsAndCustomersBookedToday(today);
  initiateMainTab();
  initiateOrdersTab();
  initiateRoomsTab();
});

domUpdates.initiateTabs();

function initiateMainTab() {
  let roomsAvailableToday = (bookingRepo.totalRooms - bookingRepo.bookedRoomNumbers.length);
  let roomIncomeToday = hotelRooms.getRoomIncome(bookingRepo.bookedRoomNumbers);
  let servicesIncomeToday = roomService.getServicesIncomeByDate(bookingRepo.bookedCustomerIDs, today)
  let todaysIncome = (roomIncomeToday + servicesIncomeToday).toFixed(2);
  let percentRoomsAvailable = ((roomsAvailableToday / bookingRepo.totalRooms) * 100).toFixed(0);
  domUpdates.initiateMain(today, roomsAvailableToday, todaysIncome, percentRoomsAvailable);
}

function initiateOrdersTab() {
  let locationToAppend = '#todays-room-service-orders'
  roomService.servicesToday.forEach(service => {
    domUpdates.appendServiceCard(service, locationToAppend);
  })
}

function initiateRoomsTab() {
  let mostAvailableDay = bookingRepo.dateMostRoomsAvailable()
  domUpdates.appendMostPopularDates(bookingRepo.mostPopularBookedDates(), mostAvailableDay);
}

$('.tabs-nav a').on('click', function(event) {
  event.preventDefault();
  let that = this;
  domUpdates.tabNavigation(that);
});

$('#search-rooms-available-btn').on('click', function() {
  let inputValue = domUpdates.grabSearchRoomsAvailable();
  domUpdates.clearRoomsAvailableSearch();
  let roomsAvailable = bookingRepo.filterAvailableRoomsByDate(inputValue);
  let location = '#search-rooms-available-by-date'
  if (roomsAvailable.length < 50) {
    domUpdates.appendRoomCards(hotelRooms.findRoomsByNumber(roomsAvailable));
  } else {
    domUpdates.appendErrorToSearchResults(location);
  } 
});

$('#search-roomservice-btn').on('click', function() {
  domUpdates.clearRoomserviceSearch();
  let inputValue = $('#search-roomservice').val()
  let locationToAppend = '#search-room-service-orders'
  if (roomService.getServicesByDate(inputValue).length > 0) {
    roomService.getServicesByDate(inputValue).forEach(service => {
      domUpdates.appendServiceCard(service, locationToAppend);
    });
  } else {
    domUpdates.appendErrorToSearchResults(locationToAppend);
  }
});

$('#search-customers-btn').on('click', function() {
  domUpdates.clearCustomerNameInput();
  let nameInput = $('#search-customers').val();
  let foundCustomer = checkifNameExists(nameInput)
  if (foundCustomer !== undefined) {
    currentCustomer = foundCustomer;
    domUpdates.showCustomerSelectBtn(currentCustomer);
  } else {
    domUpdates.appendNoCustomerFound();
  }
});

$('#customer__ask-to-select-btn').on('click', function () {
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
    domUpdates.flashUserAlreadyExists();
    currentCustomer = checkedName;
    domUpdates.appendCustomerInfo(currentCustomer);
  }
});

function checkifNameExists(name) {
  return allCustomers.find(customer => {
    return (customer.name).toLowerCase().includes((name).toLowerCase());
  });
}