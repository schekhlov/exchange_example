class Pocket {

  constructor(pockets, id, image, symbol, balance = 0) {
    this._id = id;
    this._image = image;
    this._symbol = symbol;
    this._balance = balance;
    this._value = 0;
    this._listeners = {};
    this._pockets = pockets;
  }

  get pockets() {
    return this._pockets;
  }

  get listeners() {
    return this._listeners;
  }

  get id() {
    return this._id;
  }

  get image() {
    return this._image;
  }

  get symbol() {
    return this._symbol;
  }

  get balance() {
    return this._balance;
  }

  set balance(value) {
    this._balance = value;
  }

  get balanceString() {
    return this.balance.toFixed(2);
  }

  get balanceWithSymbol() {
    return `${this.symbol}${this.balanceString}`;
  }

  get value() {
    return this._value * 1;
  }

  get valueToString() {
    return `${this._value}`;
  }

  get maxValue() {
    return this.pockets.getMaxValue(this);
  }

  set value(value) {
    // Remove zero from start of value
    let _value = `${value}`;
    _value = _value.replace(/^00/, '0');
    _value = _value.replace(/^0([1-9]+)/, '$1');

    // Currency regexp
    const regex = /^[0-9]\d*(\.\d{0,2})?$/;

    // Set zero value for empty string
    if (_value === '') {
      _value = '0';
    }

    // Check value format
    if (!regex.test(_value)) {
      return;
    }

    /*
      Check max value:
      - balance for primary pocket
      - max withdraw value for secondary pocket
     */
    if (_value * 1 > this.maxValue) {
      return;
    }

    this._value = _value;
    this.triggerEvent('onchangevalue', { value: _value });
  }

  resetValue({ silent }) {
    this._value = '0';
    if (!silent) {
      this.triggerEvent('onchangevalue', { value: this._value });
    }
  }

  addEventListener(event, cb) {
    this._listeners[event] = cb;
  }

  removeEventListener(event) {
    delete this._listeners[event];
  }

  triggerEvent(event, params) {
    if (this.listeners[event]) {
      this.listeners[event](this, params);
    }
  }

  toJSON() {
    return {
      id: this.id,
      image: this.image,
      symbol: this.symbol,
      balance: this.balance,
      value: this.valueToString,
      balanceString: this.balanceString,
      balanceWithSymbol: this.balanceWithSymbol,
    };
  }

}

export default Pocket;
