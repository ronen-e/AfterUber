var getLocation = require('./geo');
var auth = require('./authentication');
var Uber = require('node-uber');

var uber = new Uber({
  client_id: auth.CLIENT_ID,
  client_secret: auth.CLIENT_SECRET,
  server_token: auth.SERVER_TOKEN
});

var mock_coords = [37.625732, -122.377807, 37.785114, -122.406677];
var mock_data = {"prices":[{"localized_display_name":"POOL","distance":13.73,"display_name":"POOL","product_id":"26546650-e557-4a7b-86e7-6a3942445247","high_estimate":25.0,"low_estimate":18.0,"duration":1140,"estimate":"$18-24","currency_code":"USD"},{"localized_display_name":"uberX","distance":13.73,"display_name":"uberX","product_id":"a1111c8c-c720-46c3-8534-2fcdd730040d","high_estimate":33.0,"low_estimate":26.0,"duration":1140,"estimate":"$26-33","currency_code":"USD"},{"localized_display_name":"uberXL","distance":13.73,"display_name":"uberXL","product_id":"821415d8-3bd5-4e27-9604-194e4359a449","high_estimate":47.0,"low_estimate":38.0,"duration":1140,"estimate":"$38-47","currency_code":"USD"},{"localized_display_name":"SELECT","distance":13.73,"display_name":"SELECT","product_id":"57c0ff4e-1493-4ef9-a4df-6b961525cf92","high_estimate":64.0,"low_estimate":52.0,"duration":1140,"estimate":"$52-64","currency_code":"USD"},{"localized_display_name":"BLACK","distance":13.73,"display_name":"BLACK","product_id":"d4abaae7-f4d6-4152-91cc-77523e8165a4","high_estimate":76.0,"low_estimate":61.0,"duration":1140,"estimate":"$61-76","currency_code":"USD"},{"localized_display_name":"SUV","distance":13.73,"display_name":"SUV","product_id":"8920cb5e-51a4-4fa4-acdf-dd86c5e18ae0","high_estimate":94.0,"low_estimate":76.0,"duration":1140,"estimate":"$76-94","currency_code":"USD"},{"localized_display_name":"ASSIST","distance":13.73,"display_name":"ASSIST","product_id":"ff5ed8fe-6585-4803-be13-3ca541235de3","high_estimate":33.0,"low_estimate":26.0,"duration":1140,"estimate":"$26-33","currency_code":"USD"},{"localized_display_name":"WAV","distance":13.73,"display_name":"WAV","product_id":"2832a1f5-cfc0-48bb-ab76-7ea7a62060e7","high_estimate":46.0,"low_estimate":37.0,"duration":1140,"estimate":"$37-46","currency_code":"USD"}]};

function getUberPriceEstimate(start, destination) {
	//return Promise.resolve(applyChanges(mock_data));
	return Promise.all([
		getLocation(start),
		getLocation(destination)
	]).then(([startLoc, destinationLoc]) => {
		// console.log('startLoc', startLoc);
		// console.log('destinationLoc', destinationLoc);
		//return getPrice(...mock_coords); // DEBUG
		return getPrice(startLoc.latitude, startLoc.longitude, destinationLoc.latitude, destinationLoc.longitude)
	}).then((response) => applyChanges(response));
}

function getPrice(start_latitude, start_longitude, end_latitude, end_longitude) {
	//return Promise.resolve(mock_data);  // DEBUG
	
	return new Promise((resolve, reject) => {
		uber.estimates.getPriceForRoute(start_latitude, start_longitude, end_latitude, end_longitude, function (err, res) {
		  //console.log('prices', res);
		  if (err) reject(err);
		  else resolve(res);
		});			
	});
}

function applyChanges(response) {
	//console.log('prices', response.prices);
	var prices = response.prices.map(item => {
		return {
			display_name: 'After' + item.display_name,
			localized_display_name: 'After' + item.localized_display_name,
			high_estimate: parseInt(item.high_estimate * 0.8),
			low_estimate: parseInt(item.low_estimate * 0.8),
			estimate: item.estimate.charAt(0) + item.low_estimate + '-' + item.high_estimate
		};
	});
	return { prices };
} 

module.exports = getUberPriceEstimate;