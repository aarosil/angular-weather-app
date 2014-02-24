var _ = require('underscore');
var SunCalc = require('suncalc');

//mapping for WU "conditions"
var wuSkyConditionsMap = function (e) {
	if (e === 'Mostly Cloudy') return 0.75;
	if (e === 'Partly Cloudy') return 0.5;
	if (e === 'Scattered Clouds') return 0.25;
	if (e === 'Clear') return 0;
	// the other possible conditions === full cloud cover
	// http://www.wunderground.com/weather/api/d/docs?d=resources/phrase-glossary&MR=1
	return 1;
}

// given a start and end time, return array of
// dates formatted as weather underground expects
// in the request URL
exports.formatDatesWU = function(start, end) {
	var dates = [];
	var start = new Date(parseInt(start, 10));
	var end = new Date(parseInt(end, 10)||start);
	console.log("start: " + start + " end: " + end)
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
};

exports.processWUCurrentConditions = function (conditions) {
	return conditions.hasOwnProperty('current_observation') ? 
	_.pick(conditions.current_observation, 
		'weather', 'temp_f', 'temp_c', 'relative_humidity', 'wind_string', 'dewpoint_string')
	 : {}
}

exports.processWUDailyObservations = function(data, fields) {
	if (data.hasOwnProperty('observations') && data.observations.length !== 0) {
		var observations = data.observations;
		var response = { 
			//add master date to allow sorting/concatting of async data before response
			date: new Date(observations[0].date.year, observations[0].date.mon, observations[0].date.mday)
		}
		//go through all 24 observations for the day
		_.each(observations, function(obs){
			var time = new Date(obs.date.year, obs.date.mon, obs.date.mday, obs.date.hour, obs.date.min).getTime();
			//add each field as a data series in response.fieldname.series
			_.each(fields, function(field){
				//create the field with keyname & blank array if as yet uninitialized
				if (!response[field]) {
					response[field] = {key: field, values: []}
				}
				// add each value to the respons
				if (field === 'conds') { 
					// map condition string to equivalent cloud coverage
					response[field].values.push([time, wuSkyConditionsMap(obs[field])]) 
				} else { 
					//ignore some weatherstations reporting "-9999.00" for unknowns
					if (obs[field] === "-9999.00" ) { obs[field] = 0; }
					response[field].values.push([time, obs[field]])
				}				
			})
		})	
		return response;
	} else {
		return {};
	}
	
};

exports.sortAndConcatWUResponses = function(wuResponses, fields) {
	//sort all the async responses by their date
	var masterResponse = {};
	wuResponses = _.sortBy(wuResponses, function(item){return item.date})
	//then concat into one master dataseries representing all requested days.
	_.each(wuResponses, function(resp){
		_.each(fields, function(field){
			if (!masterResponse[field]) {
				masterResponse[field] = {key: field, values: []}
			}
			masterResponse[field].values = masterResponse[field].values.concat(resp[field].values)
		})
	})
	return masterResponse;
};

// take a 2d array of timestamp/cloudcover values
// and a location, return the % of daylight hours it was cloudy
exports.cloudyDaylightHours = function(data, latLong) {
	if (!data.hasOwnProperty('conds')) return
	var values = data.conds.values;
	var location = latLong.split(",")
	var lat = location[0];
	var lng = location[1];

	var i = 0; //cloudy observations during daylight 
	var j = 0; //num observations during daylight
	
	// store sunrise/sunset to 
	// avoid recalculation for each value
	var times = {}; 

	_.each(values, function(d){
		var date = new Date(d[0])
		var day = date.getDate()

		if (!times.hasOwnProperty(day)) {
			// create a new date at noon of the given day to avoid SunCalc bug. 
			// store in times[day] - *** only works if report is < 30 days ***
			times[day] = SunCalc.getTimes(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0, 0), lat, lng);
		}
		if ( times[day].sunriseEnd < date.getTime() < times[day].sunset ) {
			j++;
			i += d[1];
		}  
		
	})

	return i/j;
}
