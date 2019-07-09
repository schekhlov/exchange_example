import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Header extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <h6 className="dropdown-header">
        {this.props.children}
      </h6>
    );
  }

}

export default Header;
