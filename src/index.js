import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';
import Codes from './assets/data/currencyCodes.json';

getExchange();

$('#inputForm').on('submit', (event) => {
  event.preventDefault();
  const exchange = JSON.parse(sessionStorage.getItem('exchange'));
  const targetCurrency = $('#currencies').val();
  const exchangeAmount = parseFloat($('#exchangeAmount').val());
  $('#outputMessage').text(exchange.convert(targetCurrency, exchangeAmount));
});

function getExchange(originCurrency = "USD") {
  if (!sessionStorage.getItem('exchange') || !Object.prototype.hasOwnProperty.call(sessionStorage.getItem('exchange'), 'exchangeRate')) {
    Exchange.build(originCurrency).then((newExchange) => {
      sessionStorage.setItem('exchange', JSON.stringify(newExchange));
      getCurrencyElements();
    });  
  }
}

function getCurrencyElements() {
  const exchange = JSON.parse(sessionStorage.getItem('exchange'));
  const currencies = Object.keys(exchange.exchangeRate);
  let htmlString = "<option selected>Choose a currency</option>";
  currencies.forEach((currency) => {
    htmlString += `<option value="${currency}">${currency}: ${Codes[currency]}</option>`;
  });
  $('#currencies').html(htmlString);
}