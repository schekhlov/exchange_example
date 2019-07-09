import React from 'react';
import Menu from './index';
import Title from './Title';
import Item from './Item';
import renderer from 'react-test-renderer';

describe('Menu', () => {

  function render(props) {
    return renderer.create(<Menu {...props} />);
  }

  function getTitle(menu) {
    return menu.root.findByType(Title);
  }

  function getItem(menu) {
    return menu.root.findByType(Item);
  }

  function getItemProps() {
    return {
      id: 'id',
      title: 'title',
      image: 'img',
      value: 'value',
      onClick: () => {}
    };
  }

  function getProps(props) {
    const itemProps = getItemProps();

    return {
      title: 'Menu title',
      children: <Item {...itemProps} />,
      ...props
    };
  }

  it('Should display menu title', () => {
    const title = 'Awesome title';
    const props = getProps({ title });
    const menu = render(props);
    const _title = getTitle(menu);
    expect(_title.props.children).toBe(title);
  });

  it('Should display menu item', () => {
    const props = getProps();
    const menu = render(props);
    const item = getItem(menu);
    expect(item).not.toBe(undefined);
  });

});