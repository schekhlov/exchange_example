import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Item extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleClick = (e) => {
    const { onClick, id } = this.props;
    e.preventDefault();
    onClick(id);
  };

  render() {
    const { title, image, value } = this.props;

    return (
      <a className="dropdown-item d-flex align-items-center" onClick={this.handleClick} href="#">
        <img src={image} />&nbsp;{title} ⋅ {value}
      </a>
    );
  }

}

export default Item;
