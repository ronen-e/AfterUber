import {ESTIMATE_PRICE, ERROR} from './lib/constants';

export const items = (state, change) => {
	switch(change.type) {
		case ESTIMATE_PRICE:
			return change.items;
		default:
			return state;
	}
};

export const error = (state, change) => {
	switch(change.type) {
		case ESTIMATE_PRICE:
			return '';
		case ERROR:
			return change.error;
		default:
			return state;
	}
};

export function combineReducers(reducers) {
	return function combinedReducersFn(state, change) {
		var keys = Object.keys(reducers);
		return keys.reduce((newState, key) => {
			newState[key] = reducers[key](
			state[key],
			change
			);
			return newState;
		}, {});
	}
}
