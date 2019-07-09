import Pockets from './index';
import ExchangeRate from './ExchangeRate';
jest.mock('./ExchangeRate');

describe('Pockets', () => {

  it('Should have three items by default', () => {
    const pockets = new Pockets();
    expect(pockets.items.length).toBe(3);
  });

  it('Should have primary pocket in GBP', () => {
    const pockets = new Pockets();
    expect(pockets.primary.id).toBe('GBP');
  });

  it('Should have secondary pocket in EUR', () => {
    const pockets = new Pockets();
    expect(pockets.secondary.id).toBe('EUR');
  });

  it('Should not accept exchange when primary pocket value is 0 and secondary pocket value is 0', () => {
    const pockets = new Pockets();
    pockets.primary.value = 0;
    pockets.secondary.value = 0;
    expect(pockets.exchangeAvailable).toBe(false);
  });

  it('Should accept exchange when primary pocket value greater than 0', () => {
    const pockets = new Pockets();
    pockets.primary.value = 10;
    expect(pockets.exchangeAvailable).toBe(true);
  });

  it('Should accept exchange when secondary pocket value greater than 0', () => {
    const pockets = new Pockets();
    pockets.secondary.value = 10;
    expect(pockets.exchangeAvailable).toBe(true);
  });

  it('Should reset primary pocket value when secondary pocket value changed', () => {
    const pockets = new Pockets();
    pockets.primary.value = 10;
    pockets.secondary.value = 10;
    expect(pockets.primary.value).toBe(0);
  });

  it('Should reset secondary pocket value when primary pocket value changed', () => {
    const pockets = new Pockets();
    pockets.secondary.value = 10;
    pockets.primary.value = 10;
    expect(pockets.secondary.value).toBe(0);
  });

  describe('Max value for pocket', () => {

    it('Should return balance as max pocket value for primary pocket', () => {
      const pockets = new Pockets();
      const maxValue = pockets.getMaxValue(pockets.primary);
      expect(maxValue).toBe(pockets.primary.balance);
    });

    it('Should return max converted value for secondary pocket', () => {
      const pockets = new Pockets();
      pockets.exchangeRate.rate = 2;
      pockets.primary.balance = 100;
      const maxValue = pockets.getMaxValue(pockets.secondary);
      expect(maxValue).toBe(100 / 2);
    });

  });

  describe('Exchange', () => {

    describe('From primary pocket', () => {

      const pockets = new Pockets();

      beforeEach(() => {
        pockets.primary.balance = 100;
        pockets.secondary.balance = 100;
        pockets.exchangeRate.rate = 2;
        pockets.primary.value = 10;
        pockets.exchange();
      });

      it('Should reduce primary pocket balance', () => {
        expect(pockets.primary.balance).toBe(100 - 10);
      });

      it('Should increase secondary pocket balance', () => {
        expect(pockets.secondary.balance).toBe(100 + 10 * 2);
      });

      it('Should reset primary pocket value', () => {
        expect(pockets.primary.value).toBe(0);
      });

      it('Should reset secondary pocket value', () => {
        expect(pockets.secondary.value).toBe(0);
      });

    });

    describe('To secondary pocket', () => {

      const pockets = new Pockets();

      beforeEach(() => {
        pockets.primary.balance = 100;
        pockets.secondary.balance = 100;
        pockets.exchangeRate.rate = 2;
        pockets.secondary.value = 10;
        pockets.exchange();
      });

      it('Should reduce primary pocket balance', () => {
        expect(pockets.primary.balance).toBe(100 - 10 / 2);
      });

      it('Should increase secondary pocket balance', () => {
        expect(pockets.secondary.balance).toBe(100 + 10);
      });

      it('Should reset primary pocket value', () => {
        expect(pockets.primary.value).toBe(0);
      });

      it('Should reset secondary pocket value', () => {
        expect(pockets.secondary.value).toBe(0);
      });

    });

  });

  describe('Change primary pocket', () => {

    const updateFn = ExchangeRate.update;

    beforeAll(() => {
      ExchangeRate.update = jest.fn();
    });

    it('Should do nothing when pocket already set', () => {
      const pockets = new Pockets();
      pockets.changePrimaryPocket('GBP');
      expect(pockets.primary.id).toBe('GBP');
    });

    it('Should swap pockets', () => {
      const pockets = new Pockets();
      const primaryId = pockets.primary.id;
      const secondaryId = pockets.secondary.id;
      pockets.changePrimaryPocket(secondaryId);
      expect(pockets.primary.id).toBe(secondaryId);
      expect(pockets.secondary.id).toBe(primaryId);
    });

    it('Should change pocket', () => {
      const pockets = new Pockets();
      const secondaryId = pockets.secondary.id;
      pockets.changePrimaryPocket('USD');
      expect(pockets.primary.id).toBe('USD');
      expect(pockets.secondary.id).toBe(secondaryId);
    });

    it('Should update exchange rate', async () => {
      const pockets = new Pockets();
      await pockets.changePrimaryPocket('USD');
      expect(pockets.exchangeRate.update).toBeCalled();
    });

    afterAll(() => {
      ExchangeRate.update = updateFn;
    });

  });

  describe('Change secondary pocket', () => {

    const updateFn = ExchangeRate.update;

    beforeAll(() => {
      ExchangeRate.update = jest.fn();
    });

    it('Should do nothing when pocket already set', () => {
      const pockets = new Pockets();
      pockets.changeSecondaryPocket('EUR');
      expect(pockets.secondary.id).toBe('EUR');
    });

    it('Should swap pockets', () => {
      const pockets = new Pockets();
      const primaryId = pockets.primary.id;
      const secondaryId = pockets.secondary.id;
      pockets.changeSecondaryPocket(primaryId);
      expect(pockets.primary.id).toBe(secondaryId);
      expect(pockets.secondary.id).toBe(primaryId);
    });

    it('Should change pocket', () => {
      const pockets = new Pockets();
      const primaryId = pockets.primary.id;
      pockets.changeSecondaryPocket('USD');
      expect(pockets.primary.id).toBe(primaryId);
      expect(pockets.secondary.id).toBe('USD');
    });

    it('Should update exchange rate', async () => {
      const pockets = new Pockets();
      await pockets.changeSecondaryPocket('USD');
      expect(pockets.exchangeRate.update).toBeCalled();
    });

    afterAll(() => {
      ExchangeRate.update = updateFn;
    });

  });

});
