import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import penderMiddleware from 'redux-pender';

import * as modules from './modules';

const Reducers = combineReducers(modules);
const Middlewares = [penderMiddleware()];

// 개발 모드에서 리덕스 개발툴 사용
const isDev = process.env.NODE_ENV === 'development';
const devTools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

const configure = (preloadedState) => createStore(Reducers, preloadedState, composeEnhancers(
  applyMiddleware(...Middlewares)
));

export default configure;