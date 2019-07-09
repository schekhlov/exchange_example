import React from 'react';
import Home from './index';
import Exchange from '../../components/Exchange';
import renderer from 'react-test-renderer';
import Pocket from "../../components/Exchange/Pockets/Pocket";

describe('Home', () => {

  function render(props) {
    return renderer.create(<Home {...props} />);
  }

  function getProps(props) {
    return {
      exchange: {
        pockets: {
          exchangeRate: '',
          exchangeAvailable: false,
          primary: {
            id: 'id1',
            balanceWithSymbol: '',
            value: '0'
          },
          secondary: {
            id: 'id2',
            balanceWithSymbol: '',
            value: '0'
          },
          items: []
        }
      },
      initRequest: () => {},
      updateRequest: () => {},
      exchangeRequest: () => {},
      changePrimaryPocketRequest: () => {},
      changeSecondaryPocketRequest: () => {},
      changePrimaryPocketValueRequest: () => {},
      changeSecondaryPocketValueRequest: () => {},
      ...props
    };
  }

  function getExchange(home) {
    return home.root.findByType(Exchange);
  }

  it('Should update', () => {
    const updateRequest = jest.fn();
    const props = getProps({ updateRequest });
    const home = render(props);
    const exchange = getExchange(home);
    exchange.props.onUpdate();
    expect(updateRequest).toBeCalled();
  });

  it('Should exchange', () => {
    const exchangeRequest = jest.fn();
    const props = getProps({ exchangeRequest });
    const home = render(props);
    const exchange = getExchange(home);
    exchange.props.onExchange();
    expect(exchangeRequest).toBeCalled();
  });

  it('Should change primary pocket', () => {
    const pocketId = 'foo';
    const changePrimaryPocketRequest = jest.fn();
    const props = getProps({ changePrimaryPocketRequest });
    const home = render(props);
    const exchange = getExchange(home);
    exchange.props.onChangePrimaryPocket(pocketId);
    expect(changePrimaryPocketRequest).toBeCalledWith(pocketId);
  });

  it('Should change secondary pocket', () => {
    const pocketId = 'foo';
    const changeSecondaryPocketRequest = jest.fn();
    const props = getProps({ changeSecondaryPocketRequest });
    const home = render(props);
    const exchange = getExchange(home);
    exchange.props.onChangeSecondaryPocket(pocketId);
    expect(changeSecondaryPocketRequest).toBeCalledWith(pocketId);
  });

  it('Should change primary pocket value', () => {
    const value = '1';
    const changePrimaryPocketValueRequest = jest.fn();
    const props = getProps({ changePrimaryPocketValueRequest });
    const home = render(props);
    const exchange = getExchange(home);
    exchange.props.onChangePrimaryPocketValue(value);
    expect(changePrimaryPocketValueRequest).toBeCalledWith(value);
  });

  it('Should change secondary pocket value', () => {
    const value = '1';
    const changeSecondaryPocketValueRequest = jest.fn();
    const props = getProps({ changeSecondaryPocketValueRequest });
    const home = render(props);
    const exchange = getExchange(home);
    exchange.props.onChangeSecondaryPocketValue(value);
    expect(changeSecondaryPocketValueRequest).toBeCalledWith(value);
  });

});
