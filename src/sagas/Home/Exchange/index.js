import { put, takeEvery } from 'redux-saga/effects';
import { EXCHANGE_REQUEST } from '../../../actions/Home';
import Exchange from '../../../services/Exchange';
import { setExchange } from '../../../redux/exchange';

export function* exchange() {
  console.log('[SAGA::Home] Exchange');
  yield Exchange.pockets.exchange();
  const exchange = Exchange.toJSON();
  yield put(setExchange(exchange));
}

export function* watchExchange() {
  yield takeEvery(EXCHANGE_REQUEST, exchange);
}
