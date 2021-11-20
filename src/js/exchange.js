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
      return new Exchange(originCurrency, exchangeObject.conversion_rates);
    }).catch((error) => {
      throw Error(error.message);
    });
  }

  convert(targetCurrency, amount) {
    if (!Object.prototype.hasOwnProperty.call(this.exchangeRate, targetCurrency)) {
      return "Invalid currency";
    }
    return this.exchangeRate[targetCurrency] * amount;
  }
}