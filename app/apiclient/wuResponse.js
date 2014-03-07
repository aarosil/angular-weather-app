var _ = require('underscore');
var SunCalc = require('suncalc');

var wuResponse = function (data, fields, location, summaryFields) {

	return init()

	function init() {
		if (!data) {return}
		if (data.hasOwnProperty('current_observation')) {
			return processCurrent(data.current_observation)
		}
		if (!fields||!location) {return;}
		if (data instanceof Array && data.length > 0 ) {
			return processHistory(data)
		} 
	}

	function processCurrent(current) {
		return _.pick(current, 'weather', 'temp_f', 'temp_c', 'relative_humidity', 'wind_string', 'dewpoint_string')
	}

	function processDay(day) {
		var response = { 
			// add master date to allow sorting/concatting of async data before response
			date: new Date(day[0].date.year, parseInt(day[0].date.mon,10)-1, day[0].date.mday, 12,0,0,0,0),
			// extracted values for all the observations
			observations: [],
			// any summary averages calculated for the response
			summaryData: {},
			summaryFields: []
		}

        // get daylight hours
        var coords = location.split(",")
        var daylight = SunCalc.getTimes(response.date, coords[0], coords[1]);
        // counter for # daytime cloudy observations
        var dayObs = 0;
        var dayCloudyObs = 0;
        // initialize obj to accumulate totals of any summary avgs requested
        // and count the # obs. in case any were invalid (ie -999)
        var totals = {};
		_.each(summaryFields, function(field){
			totals[field] = {count: 0, value: 0}
		})

		// go through all observations for the day		
		_.each(day, function(obs){
			var entry = {time: new Date(obs.date.year, parseInt(obs.date.mon, 10)-1, obs.date.mday, obs.date.hour, obs.date.min).getTime()};
			var value;			

			// add each field as a property of the entry
			_.each(fields, function(field){
				entry[field] = extractValue(obs,field)
			})

			// accumulate avgs but do not cound bad obs. 
			// values toward the summary averages
			_.each(summaryFields, function(field){
				if (reject(obs[field]) === false) {
					totals[field].value += extractValue(obs,field);
					totals[field].count += 1;	
				}
			})	

	        // if this observation occured in daylight, 
	        // accumulate towards total daytime cloudiness
	        if ( daylight.sunriseEnd.getTime() < entry.time && daylight.sunset.getTime() > entry.time) {
	            dayObs++;
	            dayCloudyObs += extractValue(obs, 'conds');
	        }

			response.observations.push(entry)

		})

		// calcuate any summaries, reported once a day
        response.summaryData.time = response.date.getTime()
        response.summaryFields = summaryFields.map(function(i){return 'avg_' + i})
        _.each(_.keys(totals), function(key){
        	response.summaryData['avg_'+key] = totals[key].value/totals[key].count
        })

        // calculate avg daytime cloudiness for the day. 
        var avgClouds = (dayCloudyObs/dayObs)||0        
        response.summaryFields.push('day_conds')
        response.summaryData.day_conds = Number(avgClouds.toFixed(1));
		return response;	

	}

	function processHistory(history) {
        var response = {
			fields: fields, 
			summaryFields: [],
			observations: [], 
			summary: []        	
        }
        // process each of the days within 'history'
        var processed = _.map(history, function(day) { return processDay(day.history.observations); })
        // sort the results by date
		processed = _.sortBy(processed, function(day){return day.date})
		//then concat into one master dataseries representing all requested days.
        _.each(processed, function(resp){
        	response.observations = response.observations.concat(resp.observations)
        	response.summary.push(resp.summaryData)
        	response.summaryFields = resp.summaryFields
		})
		return response
	}

	function extractValue(obj, key) {
		if (key === 'conds') {return wuSkyConditionsMap(obj[key]);}
		return reject(obj[key]) ? 0 : Number(obj[key]);
	}

	function reject(value) {
		if (typeof value === 'undefined' || value === null) { return true }		
		var re = /N\/A|-9999|-999/
		return re.test(value);
	}	

    function wuSkyConditionsMap(e) {
        if (e === 'Mostly Cloudy') return 75;
        if (e === 'Partly Cloudy') return 50;
        if (e === 'Scattered Clouds') return 25;
        if (e === 'Clear') return 0;
        // the other possible conditions === full cloud cover
        // http://www.wunderground.com/weather/api/d/docs?d=resources/phrase-glossary&MR=1
        return 100;
    }

}

module.exports = wuResponse