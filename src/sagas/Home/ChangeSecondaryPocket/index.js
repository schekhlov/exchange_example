import { put, takeEvery } from 'redux-saga/effects';
import { CHANGE_SECONDARY_POCKET_REQUEST } from '../../../actions/Home';
import Exchange from '../../../services/Exchange';
import { setExchange } from '../../../redux/exchange';

export function* changeSecondaryPocket({ id }) {
  console.log(`[SAGA::Home] Change secondary pocket: ${id}`);
  yield Exchange.pockets.changeSecondaryPocket(id);
  const exchange = Exchange.toJSON();
  yield put(setExchange(exchange));
}

export function* watchChangeSecondaryPocket() {
  yield takeEvery(CHANGE_SECONDARY_POCKET_REQUEST, changeSecondaryPocket);
}
