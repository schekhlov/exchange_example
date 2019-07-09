import { put, takeEvery } from 'redux-saga/effects';
import { CHANGE_SECONDARY_POCKET_VALUE_REQUEST } from '../../../actions/Home';
import Exchange from '../../../services/Exchange';
import { setExchange } from '../../../redux/exchange';

export function* changeSecondaryPocketValue({ value }) {
  console.log(`[SAGA::Home] Change secondary pocket value: ${value}`);
  yield Exchange.pockets.secondary.value = value;
  const exchange = Exchange.toJSON();
  yield put(setExchange(exchange));
}

export function* watchChangeSecondaryPocketValue() {
  yield takeEvery(CHANGE_SECONDARY_POCKET_VALUE_REQUEST, changeSecondaryPocketValue);
}
