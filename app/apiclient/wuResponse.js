var _ = require('underscore');
var SunCalc = require('suncalc');

var wuResponse = {}

// function to completely handle the responses from Weather underground
wuResponse.processData = function(data, fields, location) {
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
			values: [],
			summaryData: {}
		}
        // get daylight hours
        var coords = location.split(",")
        var daylight = SunCalc.getTimes(response.date, coords[0], coords[1]);
        // counter for # daytime cloudy observations
        var dayObs = 0;
        var dayCloudyObs = 0;
		//go through all observations for the day
		_.each(observations, function(obs){
			var entry = {}
			entry.time = new Date(obs.date.year, parseInt(obs.date.mon, 10)-1, obs.date.mday, obs.date.hour, obs.date.min).getTime();
			//add each field as a property of the entry
			_.each(fields, function(field){
                // ignore some weatherstations reporting "-9999.00" for unknowns
				if (obs[field] && obs[field] !== "-9999.00" && obs[field] !== "N/A") { 
					// conditions field values are 'Cloudy', 'Scattered Clouds'...
					if (field === 'conds') { 
						// map condition value to equivalent cloud coverage
						entry[field] = wuSkyConditionsMap(obs[field]) 
	                    // increment daytime cloudiness counters
	                    if ( daylight.sunriseEnd.getTime() < entry.time < daylight.sunset.getTime() ) {
	                        dayObs++;
	                        dayCloudyObs += entry[field];
	                    }
					}  else {
						entry[field]= Number(obs[field]);
					}
				} else {
					// otherwise would have to filter later
					// because D3 cannot handle null values 
					entry[field] = 0;
				}
				
			})
			response.values.push(entry)
		})	
        // calculate avg daytime cloudiness for the day. 
        // this is only reported once a day
        var avgClouds = (dayCloudyObs/dayObs)||0
        response.summaryData = {time: response.date.getTime(), avgdaycloudy: avgClouds.toFixed(3) * 100};
		return response;	
 	}

	 
    // data is an array of daily observations responses
	if ( data instanceof Array && data.length > 0 ) {
        var masterResponse = [];
        var masterSummaryData = [];
        // so process them individually as above 
        var processed = _.map(data, function(r) { return wuResponse.processData(r, fields, location); })
        // sort the results by date
		processed = _.sortBy(processed, function(item){return item.date})
		//then concat into one master dataseries representing all requested days.
        _.each(processed, function(resp){
        	masterResponse = masterResponse.concat(resp.values)
        	masterSummaryData.push(resp.summaryData)
		})
		return {fields: fields, values: masterResponse, summary: masterSummaryData};
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

}

module.exports = wuResponse.processData