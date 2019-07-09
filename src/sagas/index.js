import { all } from 'redux-saga/effects';
import Home from './Home';

export default function* rootSaga() {
  yield all([
    Home()
  ]);
}
