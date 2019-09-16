import $ from "jquery";

export default {
  initiateTabs() {
    $('.tabs-stage div').hide();
    $('.tabs-stage div:first').show();
    $('.tabs-nav li:first').addClass('tab-active');
    $('.customer__section--info').hide();
  },

  appendCustomerInfo(foundCustomer) {
    $('.customer__section--info').show();
    $('.customer__section--info').prepend(`<p>Customer Name: ${foundCustomer.name}</p><p>Customer ID: ${foundCustomer.id}</p>`);
  },

  appendNoCustomerFound() {
    $('.customer__section--info').hide();
    $('#customer__no-customer').prepend(`<p style="color: #ff7b29">Error, Did not find customer. Please search again or add new customer below!</p>`);
  }

}