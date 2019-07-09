import mockAxios from 'axios';
import ExchangeRate from './index';

describe('ExchangeRate', () => {

  function getPrimaryPocket(id = 'GBP', symbol = '£') {
    return { id, symbol };
  }

  function getSecondaryPocket(id = 'EUR', symbol = '€') {
    return { id, symbol };
  }

  it('Should return default rate (0)', () => {
    const exchangeRate = new ExchangeRate();
    expect(exchangeRate.rate).toBe(0);
  });

  it('Should return primary pocket', () => {
    const primaryPocket = getPrimaryPocket();
    const exchangeRate = new ExchangeRate(primaryPocket, null);
    expect(exchangeRate.primaryPocket).toEqual(primaryPocket);
  });

  it('Should return secondary pocket', () => {
    const secondaryPocket = getSecondaryPocket();
    const exchangeRate = new ExchangeRate(null, secondaryPocket);
    expect(exchangeRate.secondaryPocket).toEqual(secondaryPocket);
  });

  it('Should return return base as primary pocket id', () => {
    const primaryPocket = getPrimaryPocket();
    const exchangeRate = new ExchangeRate(primaryPocket, null);
    expect(exchangeRate.base).toBe(primaryPocket.id);
  });

  it('Should return return symbols as secondary pocket id', () => {
    const secondaryPocket = getSecondaryPocket();
    const exchangeRate = new ExchangeRate(null, secondaryPocket);
    expect(exchangeRate.symbols).toBe(secondaryPocket.id);
  });

  it('Should set rate', () => {
    const testRate = 1.123;
    const exchangeRate = new ExchangeRate();
    exchangeRate.rate = testRate;
    expect(exchangeRate.rate).toBe(testRate);
  });

  it('Should have correct rate string', () => {
    const primaryPocket = getPrimaryPocket('USD', '$');
    const secondaryPocket = getSecondaryPocket('EUR', '€');
    const exchangeRate = new ExchangeRate(primaryPocket, secondaryPocket);
    exchangeRate.rate = 1.123;
    expect(exchangeRate.rateString).toBe('$1 = €1.123');
  });

  it('Should update rete', async () => {
    const rate = 1.115987;
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          rates: {
            'EUR': rate
          }
        }
      })
    );

    const primaryPocket = getPrimaryPocket('GBP', '£');
    const secondaryPocket = getSecondaryPocket('EUR', '€');
    const exchangeRate = new ExchangeRate(primaryPocket, secondaryPocket);
    await exchangeRate.update();
    expect(exchangeRate.rate).toBe(rate);
  });


});
