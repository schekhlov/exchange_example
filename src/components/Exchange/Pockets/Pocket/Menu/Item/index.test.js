import React from 'react';
import Item from './index';
import renderer from 'react-test-renderer';

describe('Item', () => {

  function render(props) {
    return renderer.create(<Item {...props} />);
  }

  function getProps(props) {
    return {
      id: 'id',
      title: 'title',
      image: 'image',
      value: 'value',
      onClick: () => {},
      ...props
    };
  }

  function getImg(item) {
    return item.root.findByType('img');
  }

  it('Should render image src', () => {
    const image = 'http://linktoimage.com/image.png';
    const props = getProps({ image });
    const item = render(props);
    const img = getImg(item);
    expect(img.props.src).toBe(image);
  });

  it('Should display title', () => {
    const title = 'Some title';
    const props = getProps({ title });
    const item = render(props);
    const tree = item.toJSON();
    expect(tree.children.includes(title)).toBe(true);
  });

  it('Should display value', () => {
    const value = '100.00';
    const props = getProps({ value });
    const item = render(props);
    const tree = item.toJSON();
    expect(tree.children.includes(value)).toBe(true);
  });

  it('Should notify when clicked', () => {
    const onClick = jest.fn();
    const id = 'foo';
    const event = { preventDefault: jest.fn() };
    const props = getProps({ id, onClick });
    const item = render(props);
    const tree = item.toJSON();
    tree.props.onClick(event);
    expect(onClick).toBeCalledWith(id);
  });

  it('Should prevent event bubbling when clicked', () => {
    const event = { preventDefault: jest.fn() };
    const props = getProps();
    const item = render(props);
    const tree = item.toJSON();
    tree.props.onClick(event);
    expect(event.preventDefault).toBeCalled();
  });

});