import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Exchange from '../../components/Exchange';

class Home extends Component {

  static propTypes = {
    exchange: PropTypes.object.isRequired,
    initRequest: PropTypes.func.isRequired,
    updateRequest: PropTypes.func.isRequired,
    exchangeRequest: PropTypes.func.isRequired,
    changePrimaryPocketRequest: PropTypes.func.isRequired,
    changeSecondaryPocketRequest: PropTypes.func.isRequired,
    changePrimaryPocketValueRequest: PropTypes.func.isRequired,
    changeSecondaryPocketValueRequest: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.initRequest();
  }

  handleExchangeUpdate = () => {
    this.props.updateRequest();
  };

  handleChangePrimaryPocket = (id) => {
    this.props.changePrimaryPocketRequest(id);
  };

  handleChangeSecondaryPocket = (id) => {
    this.props.changeSecondaryPocketRequest(id);
  };

  handleChangePrimaryPocketValue = (value) => {
    this.props.changePrimaryPocketValueRequest(value);
  };

  handleChangeSecondaryPocketValue = (value) => {
    this.props.changeSecondaryPocketValueRequest(value);
  };

  handleExchange = () => {
    this.props.exchangeRequest();
  };

  render() {
    const { exchange } = this.props;

    return (
      <main>
        <div
          className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal">
            Exchange
          </h5>
        </div>
        <Exchange
          exchange={exchange}
          onUpdate={this.handleExchangeUpdate}
          onExchange={this.handleExchange}
          onChangePrimaryPocket={this.handleChangePrimaryPocket}
          onChangeSecondaryPocket={this.handleChangeSecondaryPocket}
          onChangePrimaryPocketValue={this.handleChangePrimaryPocketValue}
          onChangeSecondaryPocketValue={this.handleChangeSecondaryPocketValue} />
      </main>
    );
  }

}

export default Home;
