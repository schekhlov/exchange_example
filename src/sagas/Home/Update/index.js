import { put, takeEvery } from 'redux-saga/effects';
import { UPDATE_REQUEST } from '../../../actions/Home';
import Exchange from '../../../services/Exchange';
import { setExchange } from '../../../redux/exchange';

export function* update() {
  console.log('[SAGA::Home] Update');
  const exchange = Exchange.toJSON();
  yield put(setExchange(exchange));
}

export function* watchUpdate() {
  yield takeEvery(UPDATE_REQUEST, update);
}
