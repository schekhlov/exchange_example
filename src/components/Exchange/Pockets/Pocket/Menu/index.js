import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Title from './Title';
import Header from './Header';
import Item from './Item';

class Menu extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
  };

  render() {
    const { title, children } = this.props;

    return (
      <div className="dropdown">
        <Title>
          {title}
        </Title>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Header>
            Choose currency:
          </Header>
          {children}
        </div>
      </div>
    );
  }

}

Menu.Item = Item;
export default Menu;
