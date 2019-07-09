import { put, takeEvery } from 'redux-saga/effects';
import { CHANGE_PRIMARY_POCKET_VALUE_REQUEST } from '../../../actions/Home';
import Exchange from '../../../services/Exchange';
import { setExchange } from '../../../redux/exchange';

export function* changePrimaryPocketValue({ value }) {
  console.log(`[SAGA::Home] Change primary pocket value: ${value}`);
  yield Exchange.pockets.primary.value = value;
  const exchange = Exchange.toJSON();
  yield put(setExchange(exchange));
}

export function* watchChangePrimaryPocketValue() {
  yield takeEvery(CHANGE_PRIMARY_POCKET_VALUE_REQUEST, changePrimaryPocketValue);
}
