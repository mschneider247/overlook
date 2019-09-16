import $ from 'jquery';
import './css/base.scss';
import Customer from './Customer';
import domUpdates from "./domUpdates";

const usersFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
  .then(data => data.json());
const roomsFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
  .then(data => data.json());
const bookingsFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
  .then(data => data.json());
const roomServicesFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices")
  .then(data => data.json());

const allData = { users: [], rooms: [], bookings: [], roomServices: []};

const allCustomers = [];
let currentCustomer;

Promise.all([usersFetch, roomsFetch, bookingsFetch, roomServicesFetch]).then(data => {
  allData.users = data[0].users;
  allData.rooms = data[1].rooms;
  allData.bookings = data[2].bookings;
  allData.roomServices = data[3].roomServices;
  return allData;
});

setTimeout(() => {
  allData.users.forEach(user => {
    let newCustomer = new Customer(user);
    allCustomers.push(newCustomer);
  })
  console.log(allCustomers);
  console.log(allData.rooms[1]);
  console.log(allData.bookings);
  console.log(allData.roomServices);
}, 1000);

domUpdates.initiateTabs();

$('.tabs-nav a').on('click', function (event) {
  event.preventDefault();
  $('.tabs-nav li').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});

$('#search-customers-btn').on('click', function() {
  $('#customer__section--current-info').html(``);
  // console.log("BUTTON CLICKED!")
  // console.log($('#search-customers').val());
  let input = ($('#search-customers').val()).toLowerCase();
  let foundCustomer = allCustomers.find(customer => {
    return (customer.name).toLowerCase().includes(input);
  });
  if (foundCustomer !== undefined) {
    // console.log(foundCustomer);
    currentCustomer = foundCustomer;
    // console.log("Current customer set to===", currentCustomer)
    $('#customer__section--current-info').prepend(`<p>Customer Name: ${foundCustomer.name}</p><p>Customer ID: ${foundCustomer.id}</p>`);
  } else {
    $('#customer__section--current-info').prepend(`<p style="color: #ff7b29">Error, Did not find customer. Please search again or add new customer below!</p>`);
  }
  

})