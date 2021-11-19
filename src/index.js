import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';
import Codes from './assets/data/currencyCodes.json';

Exchange.build().then((exchange) => {
  getCurrencyElements();

  $('#inputForm').on('submit', (event) => {
    event.preventDefault();
    const targetCurrency = $('#currencies').val();
    const exchangeAmount = parseFloat($('#exchangeAmount').val());
    $('#outputMessage').text(exchange.convert(targetCurrency, exchangeAmount));
  });

  function getCurrencyElements() {
    const currencies = Object.keys(exchange.exchangeRate);
    let htmlString = "";
    currencies.forEach((currency) => {
      htmlString += `<option value="${currency}">${currency}: ${Codes[currency]}</option>`;
    });
    $('#targetCurrency').html("<option selected>Choose target currency</option>" + htmlString);
    $('#originCurrency').html("<option selected>Choose origin currency</option>" + htmlString);
  }
});