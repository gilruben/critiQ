import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../reducers/main-reducer';

const store = createStore(mainReducer, applyMiddleware(thunk));

module.exports = store;
