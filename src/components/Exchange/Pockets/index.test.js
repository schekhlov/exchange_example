import React from 'react';
import Pockets from './index';
import renderer from 'react-test-renderer';

describe('Pockets', () => {

  function render(props) {
    return renderer.create(<Pockets {...props} />);
  }

  function getChildrenList(pockets) {
    return pockets.root.findByType('ul');
  }

  function getExchangeRate(pockets) {
    return pockets.root.findByType('span');
  }

  function getExchangeButton(pockets) {
    return pockets.root.findByType('button');
  }

  function getProps(props) {
    return {
      exchangeRate: '',
      exchangeAvailable: false,
      onExchange: () => {},
      ...props
    };
  }

  it('Should display children elements', () => {
    const children = 'Some children';
    const props = getProps({ children });
    const pockets = render(props);
    const childrenList = getChildrenList(pockets);
    expect(childrenList.props.children).toBe(children);
  });

  it('Should display exchange rate', () => {
    const exchangeRate = '£1 = €1.115277';
    const props = getProps({ exchangeRate });
    const pockets = render(props);
    const _exchangeRate = getExchangeRate(pockets);
    expect(_exchangeRate.props.children).toBe(exchangeRate);
  });

  it('Should display exchange button in disabled state when exchange unavailable', () => {
    const exchangeAvailable = false;
    const props = getProps({ exchangeAvailable });
    const pockets = render(props);
    const button = getExchangeButton(pockets);
    expect(button.props.disabled).toBe(true);
  });

  it('Should display exchange button in active state when exchange available', () => {
    const exchangeAvailable = true;
    const props = getProps({ exchangeAvailable });
    const pockets = render(props);
    const button = getExchangeButton(pockets);
    expect(button.props.disabled).toBe(false);
  });

  it('Should notify when exchange button clicked', () => {
    const onExchange = jest.fn();
    const props = getProps({ onExchange });
    const pockets = render(props);
    const button = getExchangeButton(pockets);
    button.props.onClick();
    expect(onExchange).toBeCalled();
  });

});
