import React from 'react';
import Title from './index';
import renderer from 'react-test-renderer';

describe('Title', () => {

  function render(props) {
    return renderer.create(<Title {...props} />);
  }

  it('Should display title', () => {
    const children = 'Title';
    const title = render({ children });
    const tree = title.toJSON();
    expect(tree.children[0]).toBe(children);
  });

});
