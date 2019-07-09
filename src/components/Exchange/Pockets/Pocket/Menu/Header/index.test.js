import React from 'react';
import Header from './index';
import renderer from 'react-test-renderer';

describe('Header', () => {

  function render(props) {
    return renderer.create(<Header {...props} />);
  }

  it('Should display title', () => {
    const children = 'Title';
    const header = render({ children });
    const tree = header.toJSON();
    expect(tree.children[0]).toBe(children);
  });

});