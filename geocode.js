var request = require('request');

var GoogleMapsAPIClient = function(debug) {
	console.log('Google Maps API Client initialized.\n**** debug mode: ' + debug);	

	var self = this;
	var baseUrl = 'http://maps.googleapis.com/maps/api/geocode/json?';

    var get = function(cb, params, path){
    	var url  = baseUrl +  path + "&sensor=true"
    	if (debug) console.log('GET: ' + url)

	    request(url, function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            if (debug) console.log('response body: ' + body);
	            cb(error, body);
	        }
	        else if (error) {
	            console.log('error: ' + err);
	        }

	    });
    }

    self.getLatLong = function(address, cb){
    	if (debug) console.log('address: ' + address);
    	get(cb, null, "address=" + address);
    }

    //TODO: fix this so we can show user city/state in the
    //form field instead of lat/long when the users location
    //is autodetected through the browser
    self.getAddress = function(latLng, cb){
    	if (debug) console.log('lat long: ' + latLng);
    	get(cb, null, address);
    }    

}

module.exports = GoogleMapsAPIClient