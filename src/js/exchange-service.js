export default class ExchangeService {
  static async getExchangeRate(currency = "USD") {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/{currency}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch(error) {
      return error.message;
    }    
  }
}