import ExchangeService from './exchange-service.js';

export default class Exchange {
  constructor(originCurrency, exchangeRate) {
    this.exchangeRate = exchangeRate;
    this.originCurrency = originCurrency;
  }

  //Use builder so constructor doesn't depend on async function
  static build(originCurrency = "USD") {
    let servicePromise = ExchangeService.getExchangeRate(originCurrency);
    return servicePromise.then((exchangeObject) => {
      return new Exchange(originCurrency, exchangeObject.converion_rates);
    });
  }

  convert(targetCurrency, amount) {
    if (!this.exchangeRate.hasOwnProperty(targetCurrency)) {
      return "Invalid currency";
    }
    return exchangeRate.targetCurrency * amount;
  }
}