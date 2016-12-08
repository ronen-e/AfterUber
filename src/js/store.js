import {createStore} from './lib/state';
import {items, error, combineReducers} from './reducers';

const initialState = {
	items: [],
	error: ''
};

const changeHandler = combineReducers({ items, error });

export const store = createStore(changeHandler, initialState);
export const {dispatch} = store;
