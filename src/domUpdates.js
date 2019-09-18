import $ from "jquery";

export default {
  initiateTabs() {
    $('.tabs-stage div').hide();
    $('.tabs-stage div:first').show();
    $('.tabs-nav li:first').addClass('tab-active');
    $('.customer__section--info').hide();
    $('#customer__ask-to-select').hide();
    $('#customer__no-customer').hide();
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

  appendErrorToSearchResults(location) {
    $(`${location}`).append(`<p class="error">     Error, search returned nothing</p>`);
  },

  appendMostPopularDates(dates) {
    $('#most-popular-days').text(dates);
  },

  tabNavigation(that) {
    $('.tabs-nav li').removeClass('tab-active');
    $(that).parent().addClass('tab-active');
    $('.tabs-stage div').hide();
    $($(that).attr('href')).show();
  },

  showCustomerSelectBtn() {
    $('#customer__ask-to-select').show();
    $('#search-customers-btn').hide();
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