import {showPrice, showError} from '../actions';
import {dispatch} from '../store';

async function fetchPrices(event) {
	event.preventDefault();
	event.stopPropagation();
	
	const start = document.getElementById('start').value;
	const destination = document.getElementById('destination').value;
	
	var q = encode({start, destination});
	var response = await fetch(`/price?${q}`);
	var data = await response.json();
	//console.log('server data:', data);
	if (data.err) {
		dispatch(showError());
	}
	else {
		dispatch(showPrice(data));
	}
}

function encode(params) {
	var esc = encodeURIComponent;
	var q = Object.keys(params)
		.map(k => esc(k) + '=' + esc(params[k]))
		.join('&');
		
	return q;
}

export default fetchPrices;