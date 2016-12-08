import {ESTIMATE_PRICE, ERROR} from './lib/constants';

export function showPrice({prices}) {
	return {
		type: ESTIMATE_PRICE,
		items: prices
	}
}

export function showError() {
	return {
		type: ERROR,
		error: 'Please try again'
	}
}