import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Pocket from './Pocket';

class Pockets extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    exchangeRate: PropTypes.string.isRequired,
    exchangeAvailable: PropTypes.bool.isRequired,
    onExchange: PropTypes.func.isRequired
  };

  handleExchangeClick = () => {
    this.props.onExchange();
  };

  render() {
    const { children, exchangeRate, exchangeAvailable } = this.props;

    return (
      <div className="container">
        <div className="card shadow-sm">
          <ul className="list-group list-group-flush">
            {children}
          </ul>
          <div className="card-footer text-muted">
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                disabled={!exchangeAvailable}
                onClick={this.handleExchangeClick}
                className="btn btn-success">
                Exchange
              </button>
              <span className="text-primary">
                {exchangeRate}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export { Pocket };
export default Pockets;
