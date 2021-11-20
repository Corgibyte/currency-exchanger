import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';
import Codes from './assets/data/currencyCodes.json';


function getExchange(originCurrency = "USD") {
  return Exchange.build(originCurrency).then((newExchange) => {
    exchange = newExchange;
  }).catch((error) => {
    $('#holder').html(`<h1>Server error: ${error.message}</h1>`);
  });
}

function getCurrencyElements() {
  const currencies = Object.keys(exchange.exchangeRate);
  let htmlString = "";
  currencies.forEach((currency) => {
    htmlString += `<option value="${currency}">${currency}: ${Codes[currency]}</option>`;
  });
  $('#targetCurrency').html("<option selected>Choose target currency</option>" + htmlString);
  $('#originCurrency').html("<option selected>Choose origin currency</option>" + htmlString);
}

function outputExchange(originCurrency, targetCurrency, originAmount, targetAmount) {
  const output = `<strong>${originAmount}</strong> ${Codes[originCurrency]}s exchange to <strong>${targetAmount.toFixed(2)}</strong> ${Codes[targetCurrency]}s`;
  const htmlStr = `<h2>${output}</h2>`;
  $('#outputMessages').prepend(htmlStr);
  $('#outputs').show();
}

$('#inputForm').on('submit', (event) => {
  event.preventDefault();
  const originCurrency = $('#originCurrency').val();
  const targetCurrency = $('#targetCurrency').val();
  const exchangeAmount = parseFloat($('#exchangeAmount').val());
  $('#exchangeAmount').val("");
  if (exchange.exchangeRate[originCurrency] === 1) {
    outputExchange(originCurrency, targetCurrency, exchangeAmount, exchange.convert(targetCurrency, exchangeAmount));
  } else {
    getExchange(originCurrency).then(() => {
      outputExchange(originCurrency, targetCurrency, exchangeAmount, exchange.convert(targetCurrency, exchangeAmount));
    });
  }
});

$('#clearHistory').on('click', () => {
  $('#outputMessages').html("");
  $('#outputs').hide();
});

//Initialization
let exchange;

getExchange().then(() => getCurrencyElements()).catch(() => {});