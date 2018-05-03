import { createStore, applyMiddleware } from 'redux';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import createSagaMiddleware, { END } from 'redux-saga';

import createRootReducer from '../reducers/index.js';
import rootSaga from '../sagas/index.js';

const middlewares = [];
const { logger } = require('redux-logger');

// configuring react-navigation middleware
const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

// configuring saga middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push(navigationMiddleware,sagaMiddleware);

/* global __DEV__  */
if (__DEV__) {
  middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState,navReducer) {
  const store = createStoreWithMiddleware(createRootReducer(navReducer), initialState);

  // install saga run
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  //run saga
  store.runSaga(rootSaga);

  return store;
}