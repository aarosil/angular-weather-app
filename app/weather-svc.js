var async = require('async');

var WeatherUndergroundClient = require('./apiclient/wunderground');
var wuResponse = require('./apiclient/wuResponse')
var GoogleMapsClient = require('./apiclient/geocode');
var util = require('./util/weather-util');

var WUApiKey = 'a9b08241c785e5ee';
var rateCount = 10;
var ratePeriod = 'minute';

var wu = new WeatherUndergroundClient(WUApiKey, false, rateCount, ratePeriod);
var geocode = new GoogleMapsClient(true);

//use weather underground to get current 
//weather conditions of a location
exports.getCurrentWeather = function(req,res) {
	var query = req.params.query;
	console.log('query: ' + query);
	wu.conditions(query, function(err, data){
		if (err) {
			console.log('errors: ' + err)
			res.send("An Error Occurred: " + query)
		}
		var json = JSON.parse(data);
		res.send(wuResponse(json));
	})
}

//use weather underground to collect an array 
//of daily weather summaries for a given date range
//or for one day
exports.getHistory = function(req,res) {
	var query = req.params.query;
	var requestedDates = util.formatDatesWU(req.params.startDate,req.params.endDate);
	if (req.query.summaryFields) {
		var summaryFields = req.query.summaryFields.split(',')
	}
	var fieldsToCapture = req.query.fields.split(',')
	var responses = [];
	//weather underground returns at most 1 day of observations
	//so asynchronously process the requested dates one by one
	async.forEach(requestedDates, function(date, callback){
		wu.history(query, date, function (err,data){
			if (!err) { 
				responses.push(JSON.parse(data))
				callback();
			} else {
				callback({"error": ' WeatherUnderground call failed: ' + err}) 
			}
		});
	//callback for when all of async's tasks are completed
	}, function(err) {
		if (!err) {
			var response = wuResponse(responses,fieldsToCapture,query,summaryFields)
			res.send(response)

		} else {
			console.log(err);
			return 
		}
	})
}

//use google api to translate any address 
//string into a pair of lat/long coordinates.
exports.getLatLong = function(req, res) {
	var query = req.params.location
	geocode.getLatLong(query, function(err, data){
		if (err) {
			console.log('errors: ' + err)
			res.send("An Error Occurred: " + query)
			return;
		}

		var jsonData = JSON.parse(data)

		if (jsonData.results.length !== 0) {
			var response = jsonData.results[0].geometry.location	
			console.log("resolved '" + query + "' to " + JSON.stringify(response))
			res.send(response)

		} else {
			var msg = "no location match found for " + query
			console.log(msg)
			res.status(404).send({error: msg})
		}

	})

}
