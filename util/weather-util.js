var _ = require('underscore');

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

exports.processWUDailyObservations = function(observations, fields) {
	var response = { 
		//add master date to allow sorting/concatting of async data before response
		date: new Date(observations[0].date.year, observations[0].date.mon, observations[0].date.mday)
	}
	//go through all 24 observations for the day
	_.each(observations, function(obs){
		var time = new Date(obs.date.year, obs.date.mon, obs.date.mday, obs.date.hour).getTime();
		//add each field as a data series in response.fieldname.series
		_.each(fields, function(field){
			//create the field with keyname & blank array if as yet uninitialized
			if (!response[field]) {
				response[field] = {key: field, values: []}
			}
			//ignore some weatherstations reporting -9999/9999 for unknown values
			if (Math.abs(obs[field]) === 9999) obs[field] = 0;
			response[field].values.push([time, parseInt(obs[field], 10)])
		})
	})	
	return response;
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
	return [masterResponse];
};
