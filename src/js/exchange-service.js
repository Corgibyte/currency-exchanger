export default class ExchangeService {
  static getExchangeRate(currency = "USD") {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`;
    return fetch(url).then((fetchResponse) => {
      if (!fetchResponse.ok) {
        throw Error(fetchResponse.statusText);
      } else {
        return fetchResponse.json();
      }
    }).catch((error) => {      
      throw Error(error.message);
    });
  }
}