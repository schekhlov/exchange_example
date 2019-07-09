import React from 'react';
import Exchange from './index';
import Pockets from './Pockets';
import Pocket from './Pockets/Pocket';
import Loading from './Loading';
import renderer from 'react-test-renderer';
jest.useFakeTimers();

describe('Exchange', () => {

  function render(props) {
    return renderer.create(<Exchange {...props} />);
  }

  function getProps(props) {
    return {
      exchange: {
        pockets: {
          exchangeRate: '',
          exchangeAvailable: false,
          primary: {
            id: '',
            balanceWithSymbol: '',
            value: '0'
          },
          secondary: {
            id: '',
            balanceWithSymbol: '',
            value: '0'
          },
          items: []
        }
      },
      onUpdate: () => {},
      onChangePrimaryPocket: () => {},
      onChangeSecondaryPocket: () => {},
      onChangePrimaryPocketValue: () => {},
      onChangeSecondaryPocketValue: () => {},
      onExchange: () => {},
      ...props
    };
  }

  function getLoading(pockets) {
    try {
      return pockets.root.findByType(Loading);
    } catch (e) {
      return null;
    }
  }

  function getPrimaryPocket(exchange) {
    return exchange.root.findAllByType(Pocket)[0];
  }

  function getSecondaryPocket(exchange) {
    return exchange.root.findAllByType(Pocket)[1];
  }

  function getPockets(exchange) {
    return exchange.root.findByType(Pockets);
  }

  it('Should display loading when pockets not set', () => {
    const props = getProps({ exchange: {} });
    const exchange = render(props);
    const loading = getLoading(exchange);
    expect(loading).not.toBe(null);
  });

  it('Should not display loading when pockets are set', () => {
    const props = getProps();
    const exchange = render(props);
    const loading = getLoading(exchange);
    expect(loading).toBe(null);
  });

  it('Should notify when primary pocket changed', () => {
    const newPocketId = 'id';
    const onChangePrimaryPocket = jest.fn();
    const props = getProps({ onChangePrimaryPocket });
    const exchange = render(props);
    const primaryPocket = getPrimaryPocket(exchange);
    primaryPocket.props.onChangePocket(newPocketId);
    expect(onChangePrimaryPocket).toBeCalledWith(newPocketId);
  });

  it('Should notify when primary pocket value changed', () => {
    const newValue = '100';
    const onChangePrimaryPocketValue = jest.fn();
    const props = getProps({ onChangePrimaryPocketValue });
    const exchange = render(props);
    const primaryPocket = getPrimaryPocket(exchange);
    primaryPocket.props.onChangeValue(newValue);
    expect(onChangePrimaryPocketValue).toBeCalledWith(newValue);
  });

  it('Should notify when secondary pocket changed', () => {
    const newPocketId = 'id';
    const onChangeSecondaryPocket = jest.fn();
    const props = getProps({ onChangeSecondaryPocket });
    const exchange = render(props);
    const secondaryPocket = getSecondaryPocket(exchange);
    secondaryPocket.props.onChangePocket(newPocketId);
    expect(onChangeSecondaryPocket).toBeCalledWith(newPocketId);
  });

  it('Should notify when secondary pocket value changed', () => {
    const newValue = '100';
    const onChangeSecondaryPocketValue = jest.fn();
    const props = getProps({ onChangeSecondaryPocketValue });
    const exchange = render(props);
    const secondaryPocket = getSecondaryPocket(exchange);
    secondaryPocket.props.onChangeValue(newValue);
    expect(onChangeSecondaryPocketValue).toBeCalledWith(newValue);
  });

  it('Should update after 10 seconds', () => {
    const onUpdate = jest.fn();
    const props = getProps({ onUpdate });
    const exchange = render(props);
    jest.advanceTimersByTime(10000);
    expect(onUpdate).toBeCalled();
  });

  it('Should notify when exchange', () => {
    const onExchange = jest.fn();
    const props = getProps({ onExchange });
    const exchange = render(props);
    const pockets = getPockets(exchange);
    pockets.props.onExchange();
    expect(onExchange).toBeCalled();
  });

});
