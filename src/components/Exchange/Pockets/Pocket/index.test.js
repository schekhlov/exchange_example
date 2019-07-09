import React from 'react';
import Pocket from './index';
import Menu from './Menu';
import renderer from 'react-test-renderer';

describe('Pocket', () => {

  function render(props) {
    return renderer.create(<Pocket {...props} />);
  }

  function getMenu(pocket) {
    return pocket.root.findByType(Menu);
  }

  function getMenuItem(pocket) {
    return pocket.root.findByType(Menu.Item);
  }

  function getBalance(pocket) {
    return pocket.root.findByType('small');
  }

  function getInput(pocket) {
    return pocket.root.findByType('input');
  }

  function getSign(pocket) {
    try {
      return pocket.root.findByType('h2');
    } catch (e) {
      return null;
    }
  }

  function getProps(props) {
    return {
      title: 'title',
      balance: '0',
      value: '0',
      items: [],
      onChangeValue: () => {},
      onChangePocket: () => {},
      ...props
    };
  }

  function getItemProps() {
    return {
      id: 'id',
      image: 'image',
      balanceString: 'Balance: $100.00'
    };
  }

  it('Should display menu title', () => {
    const title = 'Awesome title';
    const props = getProps({ title });
    const pocket = render(props);
    const menu = getMenu(pocket);
    expect(menu.props.title).toBe(title);
  });

  it('Should display balance', () => {
    const balance = '100';
    const props = getProps({ balance });
    const pocket = render(props);
    const _balance = getBalance(pocket);
    expect(_balance.props.children.includes(balance)).toBe(true);
  });

  it('Should notify when value changed', () => {
    const value = '100';
    const newValue = '200';
    const event = { currentTarget: { value: newValue }};
    const onChangeValue = jest.fn();
    const props = getProps({ value, onChangeValue });
    const pocket = render(props);
    const input = getInput(pocket);
    input.props.onChange(event);
    expect(onChangeValue).toBeCalledWith(newValue);
  });

  it('Should display menu item', () => {
    const item = getItemProps();
    const items = [item];
    const props = getProps({ items });
    const pocket = render(props);
    const menuItem = getMenuItem(pocket);
    expect(menuItem).not.toBe(undefined);
  });

  it('Should notify when menu item clicked', () => {
    const item = getItemProps();
    const items = [item];
    const onChangePocket = jest.fn();
    const props = getProps({ items, onChangePocket });
    const pocket = render(props);
    const menuItem = getMenuItem(pocket);
    menuItem.props.onClick(item.id);
    expect(onChangePocket).toBeCalledWith(item.id);
  });

  it('Should not render any sign when value is 0', () => {
    const value = 0;
    const props = getProps({ value });
    const pocket = render(props);
    const sign = getSign(pocket);
    expect(sign).toBe(null);
  });

  it('Should display minus sign for primary pocket', () => {
    const value = 1;
    const primary = true;
    const props = getProps({ value, primary });
    const pocket = render(props);
    const sign = getSign(pocket);
    expect(sign.props.children).toBe('-');
  });

  it('Should display plus sign for secondary pocket', () => {
    const value = 1;
    const primary = false;
    const props = getProps({ value, primary });
    const pocket = render(props);
    const sign = getSign(pocket);
    expect(sign.props.children).toBe('+');
  });

});
