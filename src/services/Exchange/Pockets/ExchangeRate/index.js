import axios from 'axios';

class ExchangeRates {

  constructor(primaryPocket, secondaryPocket) {
    this._primaryPocket = primaryPocket;
    this._secondaryPocket = secondaryPocket;
    this._appId = 'eff26ae7a5c144e09c254ac97a565744';
    this._rate = 0;
  }

  get primaryPocket() {
    return this._primaryPocket;
  }

  get secondaryPocket() {
    return this._secondaryPocket;
  }

  get appId() {
    return this._appId;
  }

  get base() {
    return this.primaryPocket.id;
  }

  get symbols() {
    return this.secondaryPocket.id;
  }

  get rate() {
    return this._rate;
  }

  set rate(value) {
    this._rate = value;
  }

  get rateString() {
    return `${this.primaryPocket.symbol}1 = ${this.secondaryPocket.symbol}${this.rate}`;
  }

  get url() {
    return `https://openexchangerates.org/api/latest.json?app_id=${this.appId}&base=${this.base}&symbols=${this.symbols}`;
  }

  async update() {
    const response = await axios.get(this.url);
    this.rate = response.data.rates[this.secondaryPocket.id];
  }

}

export default ExchangeRates;
