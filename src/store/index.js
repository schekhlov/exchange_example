import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from '../redux';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware
)(createStore);

export const createAppStore = () => {
  var storeWithMiddleware = createStoreWithMiddleware(appReducer);
  sagaMiddleware.run(rootSaga);
  return storeWithMiddleware;
};
