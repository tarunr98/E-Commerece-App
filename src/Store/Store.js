import { createStore, applyMiddleware, compose } from 'redux';
import createReducer from '../Reducers/Reducer';
import createSagaMiddleware from 'redux-saga';
import MainRootSaga from '../Sagas/index';
// import reducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose);

export function configureStore() {
  const middlewares = [];
  const store = createStore(
    createReducer(),
    {},
    composeEnhancers(applyMiddleware(...middlewares,sagaMiddleware))
  );

  // console.log("Inside Store........");
  sagaMiddleware.run(MainRootSaga);
  return store;
}

export default configureStore;