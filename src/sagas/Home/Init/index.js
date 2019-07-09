import { put, takeEvery } from 'redux-saga/effects';
import { INIT_REQUEST } from '../../../actions/Home';
import Exchange from '../../../services/Exchange';
import { setExchange } from '../../../redux/exchange';

export function* init() {
  console.log('[SAGA::Home] Init');
  yield Exchange.pockets.exchangeRate.update();
  const exchange = Exchange.toJSON();
  yield put(setExchange(exchange));
}

export function* watchInit() {
  yield takeEvery(INIT_REQUEST, init);
}
