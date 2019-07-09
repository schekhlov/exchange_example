import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Menu from './Menu';

class Pocket extends Component {

  static propTypes = {
    primary: PropTypes.bool,
    title: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    onChangePocket: PropTypes.func.isRequired
  };

  handleMenuItemClick = (id) => {
    this.props.onChangePocket(id);
  };

  handleChange = (e) => {
    this.props.onChangeValue(e.currentTarget.value);
  };

  renderItem = (pocket) => {
    return (
      <Menu.Item
        key={pocket.id}
        id={pocket.id}
        title={pocket.id}
        image={pocket.image}
        value={pocket.balanceString}
        onClick={this.handleMenuItemClick} />
    );
  };

  getSign() {
    const { value, primary } = this.props;
    if (value > 0) {
      return (
        <h2 className="text-black-50 font-weight-lighter">
          {primary ? '-' : '+'}
        </h2>
      );
    }
    return false;
  }

  render() {
    const { title, balance, items, value } = this.props;

    return (
      <li className="list-group-item">
        <div className="d-flex flex-row bd-highlight align-items-center">
          <div className="p-2 bd-highlight flex-fill">
            <Menu title={title}>
              {items.map(this.renderItem)}
            </Menu>
            <small className="text-black-50">
              Balance: {balance}
            </small>
          </div>
          {this.getSign()}
          <div className="p-2 bd-highlight flex-fill">
            <div className="input-group input-group-lg">
              <input
                type="text"
                placeholder="0"
                value={value}
                onChange={this.handleChange}
                className="form-control" />
            </div>
          </div>
        </div>
      </li>
    );
  }

}

export default Pocket;
