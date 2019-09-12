import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'

let users, rooms, bookings, roomServices;
//fetch user data
fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
  .then(data => data.json())
  .then(data => users = data.users)
  .catch(err => console.log(err));
//fetch room data
fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
  .then(data => data.json())
  .then(data => rooms = data.rooms)
  .catch(err => console.log(err));
//fetch bookings data
fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
  .then(data => data.json())
  .then(data => bookings = data.bookings)
  .catch(err => console.log(err));
//fetch roomServices data
fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices")
  .then(data => data.json())
  .then(data => roomServices = data.roomServices)
  .catch(err => console.log(err));

setTimeout(() => {
  console.log(users);
  console.log(rooms);
  console.log(bookings);
  console.log(roomServices);
}, 1000);