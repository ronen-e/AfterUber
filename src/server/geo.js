var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder({
	provider: 'google'
});

function getLocation(location) {
	return new Promise((resolve, reject) => {
		geocoder.geocode(location, function(err, res) {
		   //console.log('geocode', res);
		  if (err) {
			  //console.log('geocode error', err);
			  reject(err)
		  }
		  else {
			var {longitude, latitude} = res[0];
			longitude = +longitude.toFixed(6);
			latitude = +latitude.toFixed(6);
			//console.log('lats', longitude, latitude);
			resolve({longitude, latitude});
		  };
		});			
	});
}

module.exports = getLocation;