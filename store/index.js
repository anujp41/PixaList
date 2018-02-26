import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import result from './result';
import favorites from './favorites';
import login from './login';

const reducers = combineReducers({ login, result, favorites });
const middleWare = applyMiddleware( thunkMiddleware, createLogger());
const store = createStore( reducers, middleWare );

export default store;
export * from './result';
export * from './favorites';
export * from './login';