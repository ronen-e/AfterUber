import {listen} from './lib/events';
import fetchPrices from './lib/fetch-prices';
import {BUTTON_ID} from './lib/constants';

export function registerEventHandlers() {
    listen('click', BUTTON_ID, fetchPrices);	
	
	listen('keypress', BUTTON_ID, event => {
		if (event.keyCode === 13) {
			fetchPrices(event);
		}
	});
}


