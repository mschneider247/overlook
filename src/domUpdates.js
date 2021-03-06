import $ from "jquery";

export default {
  initiateTabs() {
    $('.tabs-stage div').hide();
    $('.tabs-stage div:first').show();
    $('.tabs-nav li:first').addClass('tab-active');
    $('.customer__section--info').hide();
    $('#customer__ask-to-select').hide();
    $('#customer__no-customer').hide();
    $('#customer-already-exists').hide();
  },

  initiateMain(today, roomsAvailable, todaysIncome, percentRoomsAvailable) {
    $('#today').text(today);
    $('#rooms-available-today').text(roomsAvailable);
    $('#todays-total-revenue').text(`$${todaysIncome}`);
    $('#todays-percent-rooms-available').text(`${percentRoomsAvailable}%`)
  },

  appendServiceCard(service, location) {
    $(`${location}`).append(`<article id="roomservice-card">
      <p> Date: ${service.date} </p>
      <p> userID: ${service.userID}</p>
      <p> food: ${service.food}</p>
      <p> total cost: $${service.totalCost}</p>
    </article>`)
  },

  clearRoomserviceSearch() {
    $('#search-room-service-orders').html(``);
  },

  grabSearchRoomsAvailable() {
    return $('#search-rooms-available').val()
  },

  clearRoomsAvailableSearch() {
    $('#search-rooms-available-by-date').html(``);
  },

  appendErrorToSearchResults(location) {
    $(`${location}`).append(`<p class="error">     Error, search returned nothing</p>`);
  },

  appendMostPopularDates(dates, mostAvailableDay) {
    $('#most-popular-days').text(dates);
    $('#most-available-day').text(mostAvailableDay);
  },

  appendRoomCards(rooms) {
    rooms.forEach(room => {
      $('#search-rooms-available-by-date').append(`<article class="room-card">
          <p>Room# ${room.number}</p>
          <p>Type: ${room.roomType}</p>
          <p>Bidet? ${room.bidet}</p>
          <p>BedSize! ${room.bedSize}</p>
          <p>#Beds: ${room.numBeds}</p>
          <p>CostPerNight $${room.costPerNight}</p>
        </article>`)
    })
  },

  tabNavigation(that) {
    $('.tabs-nav li').removeClass('tab-active');
    $(that).parent().addClass('tab-active');
    $('.tabs-stage div').hide();
    $($(that).attr('href')).show();
  },

  showCustomerSelectBtn(foundCustomer) {
    $('#found-customer').html(``);
    $('#customer__ask-to-select').show();
    $('#search-customers-btn').hide();
    $('.customer__section--info').hide();
    $('#found-customer').prepend(`<p>Customer Name: ${foundCustomer.name}</p><p>Customer ID: ${foundCustomer.id}</p>`);
  },

  showCustomerSearchBtn() {
    $('#search-customers-btn').show();
  },

  appendCustomerInfo(foundCustomer) {
    $('#customer__ask-to-select').hide();
    $('.customer__section--info').show();
    $('#search-customers').val('');
    $('#customer__new-name-input').val('');
    $('.customer__section--info').prepend(`<p>Customer Name: ${foundCustomer.name}</p><p>Customer ID: ${foundCustomer.id}</p>`);
  },

  appendNoCustomerFound() {
    $('#customer__no-customer').show();
    $('.customer__section--info').hide();
    $('#customer__no-customer').show();
    $('#customer__new-name').text($('#search-customers').val());
  },

  flashUserAlreadyExists() {
    $('#customer-already-exists').show();
    setTimeout(() => {
      $('#customer-already-exists').hide();
    }, 1000);
  },

  clearCustomerNameInput() {
    $('.customer__section--info').html(``);
    $('#customer__no-customer').hide();
  },

  grabNewCustomerName() {
    return $('#customer__new-name-input').val();
  },

  clearNoCustomerError() {
    $('#customer__no-customer').hide();
  }
}