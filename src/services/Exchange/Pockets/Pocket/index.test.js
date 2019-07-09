import Pocket from './index';

describe('Pocket', () => {

  it('Should create pocket with zero balance', () => {
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', 'pocketSymbol');
    expect(pocket.balance).toBe(0);
  });

  it('Should create pocket with non zero balance', () => {
    const balance = 100;
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', 'pocketSymbol', balance);
    expect(pocket.balance).toBe(balance);
  });

  it('Should have pockets reference', () => {
    const pockets = {};
    const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
    expect(pocket.pockets).toBe(pockets);
  });

  it('Should not have listeners', () => {
    const pockets = {};
    const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
    expect(pocket.listeners).toEqual({});
  });

  it('Should set balance', () => {
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', 'pocketSymbol');
    const balance = 100;
    pocket.balance = balance;
    expect(pocket.balance).toBe(balance);
  });

  it('Should have id', () => {
    const pocketId = 'pocketId';
    const pocket = new Pocket(null, pocketId, 'pocketImage', 'pocketSymbol');
    expect(pocket.id).toBe(pocketId);
  });

  it('Should have image', () => {
    const pocketImage = 'pocketImage';
    const pocket = new Pocket(null, 'pocketId', pocketImage, 'pocketSymbol');
    expect(pocket.image).toBe(pocketImage);
  });

  it('Should have symbol', () => {
    const pocketSymbol = '$';
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', pocketSymbol);
    expect(pocket.symbol).toBe(pocketSymbol);
  });

  it('Should round balance to 2 decimal points after dot', () => {
    const balance = 100.3333333;
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', 'pocketSymbol', balance);
    expect(pocket.balanceString).toBe('100.33');
  });

  it('Should display balance string with currency symbol', () => {
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', '$', 100.333333);
    expect(pocket.balanceWithSymbol).toBe('$100.33');
  });

  it('Should have zero value by default', () => {
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', 'pocketSymbol');
    expect(pocket.value).toBe(0);
  });

  it('Should convert value to string', () => {
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', 'pocketSymbol');
    expect(pocket.valueToString).toBe('0');
  });

  it('Should silently reset value', () => {
    const pockets = { getMaxValue: () => 1000 };
    const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
    pocket.value = 100;
    pocket.triggerEvent = jest.fn();
    pocket.resetValue({ silent: true });
    expect(pocket.triggerEvent).not.toBeCalled();
  });

  it('Should not silently reset value', () => {
    const pockets = { getMaxValue: () => 1000 };
    const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
    pocket.value = 100;
    pocket.triggerEvent = jest.fn();
    pocket.resetValue({ silent: false });
    expect(pocket.triggerEvent).toBeCalled();
  });

  it('Should add event listener', () => {
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', 'pocketSymbol');
    const cb = () => {};
    pocket.addEventListener('event', cb);
    expect(pocket.listeners).toEqual({ 'event': cb });
  });

  it('Should remove event listener', () => {
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', 'pocketSymbol');
    const cb = () => {};
    pocket.addEventListener('event', cb);
    pocket.removeEventListener('event');
    expect(pocket.listeners).toEqual({});
  });

  it('Should trigger event with params', () => {
    const pocket = new Pocket(null, 'pocketId', 'pocketImage', 'pocketSymbol');
    const cb = jest.fn();
    const params = { 'param': 'value' };
    pocket.addEventListener('event', cb);
    pocket.triggerEvent('event', params);
    expect(cb).toBeCalledWith(pocket, params);
  });

  describe('Set value', () => {

    const pockets = { getMaxValue: () => 100 };

    it('Should transform two zero into one', () => {
      const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
      pocket.value = '00';
      expect(pocket.value).toBe(0);
    });

    it('Should remove zero from the start', () => {
      const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
      pocket.value = '01';
      expect(pocket.value).toBe(1);
    });

    it('Should transform empty string into zero value', () => {
      const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
      pocket.value = '';
      expect(pocket.value).toBe(0);
    });

    it('Should not accept letters', () => {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
      for (let i = 0; i <= alphabet.length; i++) {
        pocket.value = alphabet[i];
        expect(pocket.value).toBe(0);
      }
    });

    it('Should not accept more then 2 digits after dot', () => {
      const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
      pocket.value = '12.123';
      expect(pocket.value).toBe(0); // Value should not be changed
    });

    it('Should not accept value grater then max value', () => {
      const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
      pocket.value = 100.1;
      expect(pocket.value).toBe(0);
    });

    it('Should accept correct values', () => {
      const values = [
        { value: '1', expected: 1 },
        { value: '12', expected: 12 },
        { value: '1.12', expected: 1.12 },
        { value: '12.00', expected: 12.00 },
        { value: '12.99', expected: 12.99 },
        { value: '0.99', expected: 0.99 },
        { value: '0.', expected: 0 }
      ];

      for (let i = 0; i < values.length; i++) {
        const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol');
        const { value, expected } = values[i];
        pocket.value = value;
        expect(pocket.value).toBe(expected);
      }
    });

  });

  it('Should return correct JSON state of Pocket', () => {
    const pockets = { getMaxValue: () => 100 };
    const pocket = new Pocket(pockets, 'pocketId', 'pocketImage', 'pocketSymbol', 199);
    pocket.value = 99.99;
    const json = pocket.toJSON();
    expect(json).toEqual({
      id: 'pocketId',
      image: 'pocketImage',
      symbol: 'pocketSymbol',
      balance: 199,
      value: '99.99',
      balanceString: '199.00',
      balanceWithSymbol: 'pocketSymbol199.00',
    });
  });

});
