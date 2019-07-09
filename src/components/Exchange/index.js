import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Pockets, { Pocket } from './Pockets';
import Loading from './Loading';

class Exchange extends Component {

  static propTypes = {
    exchange: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onChangePrimaryPocket: PropTypes.func.isRequired,
    onChangeSecondaryPocket: PropTypes.func.isRequired,
    onChangePrimaryPocketValue: PropTypes.func.isRequired,
    onChangeSecondaryPocketValue: PropTypes.func.isRequired,
    onExchange: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.interval = setInterval(this.props.onUpdate, 10000);
  }

  handleChangePrimaryPocket = (id) => {
    this.props.onChangePrimaryPocket(id);
  };

  handleChangeSecondaryPocket = (id) => {
    this.props.onChangeSecondaryPocket(id);
  };

  handleChangePrimaryPocketValue = (value) => {
    this.props.onChangePrimaryPocketValue(value);
  };

  handleChangeSecondaryPocketValue = (value) => {
    this.props.onChangeSecondaryPocketValue(value);
  };

  handleExchange = () => {
    this.props.onExchange();
  };

  render() {
    const { exchange } = this.props;

    if (!exchange.pockets) {
      return (
        <Loading />
      );
    }

    return (
      <Pockets
        exchangeRate={exchange.pockets.exchangeRate}
        exchangeAvailable={exchange.pockets.exchangeAvailable}
        onExchange={this.handleExchange}>
        <Pocket
          primary
          balance={exchange.pockets.primary.balanceWithSymbol}
          title={exchange.pockets.primary.id}
          value={exchange.pockets.primary.value}
          items={exchange.pockets.items}
          onChangeValue={this.handleChangePrimaryPocketValue}
          onChangePocket={this.handleChangePrimaryPocket} />
        <Pocket
          balance={exchange.pockets.secondary.balanceWithSymbol}
          title={exchange.pockets.secondary.id}
          value={exchange.pockets.secondary.value}
          items={exchange.pockets.items}
          onChangeValue={this.handleChangeSecondaryPocketValue}
          onChangePocket={this.handleChangeSecondaryPocket} />
      </Pockets>
    );
  }

  componentWillUnmount() {
    this.interval = null;
  }

}

export default Exchange;
