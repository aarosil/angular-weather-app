var _ = require('underscore');
var SunCalc = require('suncalc');

var wuResponse = {}

// function to completely handle the responses from Weather underground
wuResponse.processData = function(data, fields, location, summaryFields) {
    // data is the current observation 
    if (typeof data === 'object' && data.hasOwnProperty('current_observation')) {
        return _.pick(data.current_observation, 'weather', 'temp_f', 'temp_c', 'relative_humidity', 'wind_string', 'dewpoint_string')
    }

	if (!data||!fields||!location) return;

	// data is a single day's collection of observations
    if (typeof data === 'object' && data.hasOwnProperty('history') && data.history.observations.length !== 0) {

		var observations = data.history.observations;
		var response = { 
			//add master date to allow sorting/concatting of async data before response
			date: new Date(observations[0].date.year, parseInt(observations[0].date.mon,10)-1, observations[0].date.mday, 12,0,0,0,0),
			//values for all observations
			observations: [],
			//any summaries for the response
			summaryData: {},
			summaryFields: []
		}
        // get daylight hours
        var coords = location.split(",")
        var daylight = SunCalc.getTimes(response.date, coords[0], coords[1]);
        // counter for # daytime cloudy observations
        var dayObs = 0;
        var dayCloudyObs = 0;
        // hold totals if any summary requested
        var totals = {};
		//go through all observations for the day
		_.each(observations, function(obs){
			var entry = {}
			entry.time = new Date(obs.date.year, parseInt(obs.date.mon, 10)-1, obs.date.mday, obs.date.hour, obs.date.min).getTime();
			//add each field as a property of the entry
			_.each(fields, function(field){
                var value;
				if (field === 'conds') { 
					// map condition value to equivalent cloud coverage
					value = wuSkyConditionsMap(obs[field]) 
                    // increment daytime cloudiness counters
                    if ( daylight.sunriseEnd.getTime() < entry.time && entry.time < daylight.sunset.getTime() ) {
                        dayObs++;
                        dayCloudyObs += value;
                    }
				}  else {
					value = reject(obs[field]) ? 0 : Number(obs[field]);
				}
				entry[field] = value;
				if (summaryFields && summaryFields.indexOf(field) !== -1) { 
					if (!totals[field]) {totals[field]=0 }
					totals[field] += value
				}
			})
			response.observations.push(entry)
		})	

		// calcuate any summaries, reported once a day
        response.summaryData.time = response.date.getTime()
        _.each(summaryFields, function(field){
        	var name = 'avg_' + field
        	response.summaryFields.push(name)
        	response.summaryData[name] = totals[field]/response.observations.length
        })
        // calculate avg daytime cloudiness for the day. 
        var avgClouds = (dayCloudyObs/dayObs)||0        
        response.summaryFields.push('day_conds')
        response.summaryData.day_conds = avgClouds.toFixed(3) * 100;

		return response;	

 	}

    // data is an array of daily observations responses
	if ( data instanceof Array && data.length > 0 ) {
        var masterResponse = [];
        var masterSummaryData = [];
        var masterSummaryFields;
        // so process them individually as above 
        var processed = _.map(data, function(r) { return wuResponse.processData(r, fields, location, summaryFields); })
        // sort the results by date
		processed = _.sortBy(processed, function(item){return item.date})
		//then concat into one master dataseries representing all requested days.
        _.each(processed, function(resp){
        	masterResponse = masterResponse.concat(resp.observations)
        	masterSummaryData.push(resp.summaryData)
        	masterSummaryFields = resp.summaryFields
		})
		return {
			fields: fields, //return the fields for frontend easiness
			summaryFields: masterSummaryFields,
			observations: masterResponse, 
			summary: masterSummaryData
		};
	}

	else {
		return;
	}

    function wuSkyConditionsMap(e) {
        if (e === 'Mostly Cloudy') return 0.75;
        if (e === 'Partly Cloudy') return 0.5;
        if (e === 'Scattered Clouds') return 0.25;
        if (e === 'Clear') return 0;
        // the other possible conditions === full cloud cover
        // http://www.wunderground.com/weather/api/d/docs?d=resources/phrase-glossary&MR=1
        return 1;
    }

	// ignore undefined value and some 
	// weatherstations reporting "-9999.00" for unknowns
	function reject(value) {
		if (typeof value === 'undefined' || value === null) { return true }		
		var re = /N\/A|-9999|-999/
		return re.test(value);
	}

}

module.exports = wuResponse.processData