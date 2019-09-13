import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'

const usersFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
  .then(data => data.json());
const roomsFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
  .then(data => data.json());
const bookingsFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
  .then(data => data.json());
const roomServicesFetch = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices")
  .then(data => data.json());

const allData = { users: [], rooms: [], bookings: [], roomServices: []};

Promise.all([usersFetch, roomsFetch, bookingsFetch, roomServicesFetch]).then(data => {
  allData.users = data[0].users;
  allData.rooms = data[1].rooms;
  allData.bookings = data[2].bookings;
  allData.roomServices = data[3].roomServices;
  return allData;
});

setTimeout(() => {
  console.log(allData.users);
  console.log(allData.rooms);
  console.log(allData.bookings);
  console.log(allData.roomServices);
}, 1000);

//assign variables to fetch
//all data is an object of keys whos values are arrays
//promise.all takes all the fetch variables and then all data gets assigned
// to each fetched data thing that comes back.