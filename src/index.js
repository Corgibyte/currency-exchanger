import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';

let exchange;
getExchange();

$('#inputForm').on('submit', (event) => {
  event.preventDefault();
  const targetCurrency = $('#targetCurrency').val();
  const exchangeAmount = parseFloat($('#exchangeAmount').val());
  $('#outputMessage').text(exchange.convert(targetCurrency, exchangeAmount));
});

function getExchange(originCurrency = "USD") {
  Exchange.build(originCurrency).then((newExchange) => {
    exchange = newExchange;
  });  
}