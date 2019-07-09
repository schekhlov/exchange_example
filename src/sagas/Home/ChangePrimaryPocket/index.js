import { put, takeEvery } from 'redux-saga/effects';
import { CHANGE_PRIMARY_POCKET_REQUEST } from '../../../actions/Home';
import Exchange from '../../../services/Exchange';
import { setExchange } from '../../../redux/exchange';

export function* changePrimaryPocket({ id }) {
  console.log(`[SAGA::Home] Change primary pocket: ${id}`);
  yield Exchange.pockets.changePrimaryPocket(id);
  const exchange = Exchange.toJSON();
  yield put(setExchange(exchange));
}

export function* watchChangePrimaryPocket() {
  yield takeEvery(CHANGE_PRIMARY_POCKET_REQUEST, changePrimaryPocket);
}
