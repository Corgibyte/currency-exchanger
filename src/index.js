import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';
import Codes from './assets/data/currencyCodes.json';


function getExchange(originCurrency = "USD") {
  return Exchange.build(originCurrency).then((newExchange) => {
    exchange = newExchange;
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
  const output = `${originAmount} ${Codes[originCurrency]} can be exchanged to ${targetAmount.toFixed(2)} ${Codes[targetCurrency]}`;
  const htmlStr = `<h2>${output}</h2>`;
  $('#outputs').prepend(htmlStr);
  $('#outputs').show();
}

$('#inputForm').on('submit', (event) => {
  event.preventDefault();
  const originCurrency = $('#originCurrency').val();
  const targetCurrency = $('#targetCurrency').val();
  const exchangeAmount = parseFloat($('#exchangeAmount').val());
  if (exchange.exchangeRate[originCurrency] === 1) {
    outputExchange(originCurrency, targetCurrency, exchangeAmount, exchange.convert(targetCurrency, exchangeAmount));
  } else {
    getExchange(originCurrency).then(() => {
      outputExchange(originCurrency, targetCurrency, exchangeAmount, exchange.convert(targetCurrency, exchangeAmount));
    });
  }
});


let exchange;

getExchange().then(() => getCurrencyElements());