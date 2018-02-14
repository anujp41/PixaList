import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import result from './result';

const reducers = combineReducers({ result });
const middleWare = applyMiddleware( thunkMiddleware, createLogger());
const store = createStore( reducers, middleWare );

export default store;
export * from './result';