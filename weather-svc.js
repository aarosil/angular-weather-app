var async = require('async');
var _ = require('underscore');

var WeatherUndergroundClient = require('./wunderground');
var GoogleMapsClient = require('./geocode');

var WUApiKey = 'a9b08241c785e5ee';
var rateCount = 10;
var ratePeriod = 'minute';

var wu = new WeatherUndergroundClient(WUApiKey, true, rateCount, ratePeriod);
var geocode = new GoogleMapsClient(true);

//use weather underground to get current 
//weather conditions of a location
exports.getWeather = function(req,res) {
	var query = req.params.query;
	console.log('query: ' + query);
	wu.conditions(query, function(err, data){
		if (err) {
			console.log('errors: ' + err)
			res.send("An Error Occurred: " + query)
		}
		
		var conds = JSON.parse(data).current_observation
		//to save bandwidth, don't send entire WU response 
		//just the fields we are interested in
		var response = {
			weather: conds.weather, 
			temp_f: conds.temp_f,
			temp_c: conds.temp_c,
			relative_humidity: conds.relative_humidity,
			wind: conds.wind_string,
			dewpoint: conds.dewpoint_string
		}
		res.send(response)
	})

}

//use weather underground to collect an array 
//of daily weather summaries for a given date range
//or for one day
exports.getHistory = function(req,res) {
	var query = req.params.query;
	var startDate = new Date(parseInt(req.params.startDate, 10));
	var endDate = new Date(parseInt(req.params.endDate, 10)||startDate);

	console.log('query: ' + query + ', startDate: ' + startDate + ", endDate: " + endDate)

	// given a start an end time, return an 
	// array of pre-formatted dates 
	// TODO: refactor into util module!
	function getDates(start, end) {
		var dates = [];
		//format the date in YYYYMMDD as the WU API expects 
		function formatDate(date){
			var ret = date.getFullYear() 
			ret += date.getMonth() < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) 
			ret += date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			return ret;
		}
		//push formatted date into function's return value 
		//then add a day and repeat until end date is exceeded
		while (start.getTime() <= end.getTime()) {
			dates.push(formatDate(start));
			//adding +1 to day rolls over other values 
			//as well, ie 20131231 + 1 = 20140101
			start.setDate(start.getDate() + 1);
		}
		return dates;
	}

	var requestedDates = getDates(startDate,endDate);
	var fieldsToSend = ['tempi','hum','pressurei','precipi','fog','rain','snow'];
	var responseData = [];

	//weather underground returns at most 1 day of observations
	//so asynchronously process the requested dates one by one
	async.forEach(requestedDates, function(date, callback){
		wu.history(query, date, function (err,data){
			if (err) { callback({"error": ' WeatherUnderground call failed: ' + err}) }

			var json = JSON.parse(data)
			if (json.history.observations.length === 0) {
				//callback({"error": ' no observations returned from query ' + query});
				return
			} else {
				var observations = json.history.observations
				
				var response = { 
					//add master date to allow sorting/concatting of async data before response
					date: new Date(observations[0].date.year, observations[0].date.mon, observations[0].date.mday)
				}

				//go through all 24 observations for the day
				_.each(observations, function(obs){
					//add each field as a data series in response.fieldname.series
					_.each(fieldsToSend, function(field){
						//create the field with keyname & blank array if as yet uninitialized
						if (!response[field]) {
							response[field] = {key: field, values: []}
						}
						var time = new Date(obs.date.year, obs.date.mon, obs.date.mday, obs.date.hour);
						response[field].values.push([time.getTime(),parseInt(obs[field], 10)])

					})
				})
				responseData.push(response)

				//notify async processing is completed
				callback();
			}
		});
	//callback for when all of async's tasks are completed
	}, function(err) {
		if (err) {
			console.log(err);
			return 
		} else {
			var masterResponse = {}
			//sort all the async responses by their date
			responseData = _.sortBy(responseData, function(item){return item.date})
			//then concat into one master dataseries representing all requested days.
			_.each(responseData, function(resp){
				_.each(fieldsToSend, function(field){
					if (!masterResponse[field]) {
						masterResponse[field] = {key: field, values: []}
					}
					masterResponse[field].values = masterResponse[field].values.concat(resp[field].values)
				})
			})
			res.send([masterResponse])
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
		}

		var jsonData = JSON.parse(data)
		var response = jsonData.results[0].geometry.location
		console.log("resolved '" + query + "' to " + JSON.stringify(response))
		res.send(response)
	})

}
