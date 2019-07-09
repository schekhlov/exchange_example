import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import * as Actions from '../../actions/Home';

function mapStateToProps({ exchange }) {
  return {
    exchange
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {
    initRequest: Actions.initRequest,
    updateRequest: Actions.updateRequest,
    exchangeRequest: Actions.exchangeRequest,
    changePrimaryPocketRequest: Actions.changePrimaryPocketRequest,
    changeSecondaryPocketRequest: Actions.changeSecondaryPocketRequest,
    changePrimaryPocketValueRequest: Actions.changePrimaryPocketValueRequest,
    changeSecondaryPocketValueRequest: Actions.changeSecondaryPocketValueRequest
  }), dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
