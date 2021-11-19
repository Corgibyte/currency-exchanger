import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';
import Codes from './assets/data/currencyCodes.json';

let exchange;
getExchange();

$('#inputForm').on('submit', (event) => {
  event.preventDefault();
  const targetCurrency = $('#currencies').val();
  const exchangeAmount = parseFloat($('#exchangeAmount').val());
  $('#outputMessage').text(exchange.convert(targetCurrency, exchangeAmount));
});

function getExchange(originCurrency = "USD") {
  Exchange.build(originCurrency).then((newExchange) => {
    exchange = newExchange;
    getCurrencyElements();
  });  
}

function getCurrencyElements() {
  const currencies = Object.keys(exchange.exchangeRate);
  let htmlString = "<option selected>Choose a currency</option>";
  currencies.forEach((currency) => {
    htmlString += `<option value="${currency}">${currency}: ${Codes[currency]}</option>`;
  });
  $('#currencies').html(htmlString);
}