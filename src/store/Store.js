import { createStore } from 'redux';
import combineReducers from '../reducers/CombineReducers';

const store = createStore(combineReducers);

export default store;
