import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Title extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <button
        className="btn btn-light btn-lg dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        {this.props.children}
      </button>
    );
  }

}

export default Title;
