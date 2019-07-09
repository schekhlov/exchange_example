import Pocket from './Pocket';
import ExchangeRate from './ExchangeRate';

class Pockets {

  constructor() {
    const gbp = new Pocket(this, 'GBP', 'https://www.countryflags.io/gb/flat/24.png', '£', 100);
    const eur = new Pocket(this, 'EUR', 'https://www.countryflags.io/eu/flat/24.png', '€', 100);
    const usd = new Pocket(this, 'USD', 'https://www.countryflags.io/us/flat/24.png', '$', 100);
    this._items = [gbp, eur, usd];
    this._primary = gbp;
    this._secondary = eur;
    this._exchangeRate = new ExchangeRate(gbp, eur);
    this.addChangePocketValueListener();
  }

  get items() {
    return this._items;
  }

  get primary() {
    return this._primary;
  }

  set primary(value) {
    this._primary = value;
  }

  get secondary() {
    return this._secondary;
  }

  set secondary(value) {
    this._secondary = value;
  }

  set items(arr) {
    this._items = arr;
  }

  set exchangeRate(value) {
    this._exchangeRate = value;
  }

  get exchangeRate() {
    return this._exchangeRate;
  }

  get exchangeAvailable() {
    return this.primary.value > 0 || this.secondary.value > 0;
  }

  addChangePocketValueListener() {
    this.items.map(item => item.addEventListener('onchangevalue', this.onChangePocketValue.bind(this)));
  }

  getMaxValue(pocket) {
    if (pocket === this.primary) {
      return pocket.balance;
    }
    return (this.primary.balance / this.exchangeRate.rate).toFixed(2) * 1;
  }

  onChangePocketValue(pocket) {
    if (this.primary === pocket) {
      this.secondary.resetValue({ silent: true });
    } else {
      this.primary.resetValue({ silent: true });
    }
  }

  exchange() {
    if (this.primary.value > 0) {
      this.exchangeFromPrimary();
    }
    if (this.secondary.value > 0) {
      this.exchangeToSecondary();
    }
  }

  exchangeFromPrimary() {
    this.primary.balance -= this.primary.value;
    this.secondary.balance += this.primary.value * this.exchangeRate.rate;
    this.secondary.resetValue({ silent: true });
    this.primary.resetValue({ silent: true });
  }

  exchangeToSecondary() {
    this.primary.balance -= this.secondary.value / this.exchangeRate.rate;
    this.secondary.balance += this.secondary.value;
    this.secondary.resetValue({ silent: true });
    this.primary.resetValue({ silent: true });
  }

  async changePrimaryPocket(id) {
    const selected = this.getById(id);

    // Nothing to change
    if (this.primary.id === id) {
      return;
    }

    // Swap pockets
    if (selected === this.secondary) {
      return this.swap();
    }

    this.primary = selected;
    return this.updateExchangeRate();
  }

  async changeSecondaryPocket(id) {
    const selected = this.getById(id);

    // Nothing to change
    if (this.secondary.id === id) {
      return;
    }

    // Swap pockets
    if (selected === this.primary) {
      return this.swap();
    }

    this.secondary = selected;
    return this.updateExchangeRate();
  }

  async swap() {
    const tmp = this.primary;
    this.primary = this.secondary;
    this.secondary = tmp;
    return this.updateExchangeRate();
  }

  async updateExchangeRate() {
    this.exchangeRate = new ExchangeRate(this.primary, this.secondary);
    return this.exchangeRate.update();
  }

  getById(id) {
    return this.items.find(pocket => pocket.id === id);
  }

  toJSON() {
    const primary = this.primary.toJSON();
    const secondary = this.secondary.toJSON();
    const exchangeRate = this.exchangeRate.rateString;
    const items = this.items.map(item => item.toJSON());

    return {
      items,
      primary,
      secondary,
      exchangeRate,
      exchangeAvailable: this.exchangeAvailable
    };
  }

}

export default Pockets;
