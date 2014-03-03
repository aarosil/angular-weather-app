/*********************************
/Unit test of wuResponse.js
/********************************/
var _ = require('underscore')
var wuResponse = require('../../../app/apiclient/wuResponse')

// import preconfigured data samples
var data = require('./wutestdata')

// test variables
var fields = ['tempi','conds','hum', 'wspdi'];
var summaryFields = ['tempi','conds','hum', 'wspdi'];
var location  = '37,-121';

// hold the results of the function
var processed;

describe('Weather Underground Response Handler', function(){

	it('should calculate the average daytime cloud cover properly', function(){
		// only daytime observations should influence day_conds
		summaryFields = ['tempi', 'conds', 'wspdi'];
		fields = ['tempi', 'conds', 'wspdi'];
		processed = wuResponse(data.feb26, fields, location, summaryFields)
		expect(processed.summaryData).not.toBe(null)
		expect(processed.summaryData.avg_wspdi).toBe(30)
		expect(processed.summaryData.avg_tempi).toBe(50)
		// all daytime observations were cloudy
		expect(processed.summaryData.day_conds).toBe(100)
		// only 3/4 total observations were cloudy
		expect(processed.summaryData.avg_conds).toBe(0.75)
		
	})

	it('should calculate the other averages properly, ignoring bad values in calculating the avg', function(){
		fields = ['tempi', 'conds', 'wspdi', 'hum'];
		summaryFields = ['tempi', 'conds', 'wspdi', 'hum'];
		processed = wuResponse(data.dayWithBadTemps, fields, location, summaryFields)
		expect(processed.summaryData.avg_tempi).toBe(50)
		expect(processed.summaryData.avg_conds).toBe(0.25)
		expect(processed.summaryData.avg_wspdi).toBe(30)
		expect(processed.summaryData.avg_hum).toBe(70)
	})

	// behavior when called with an array of response objects
	it('should process an array of "history" responses and return the fields as expected', function(){
		fields = ['tempi', 'conds', 'wspdi'];
		processed = wuResponse([data.feb27,data.feb26], fields, location, summaryFields)
		expect(processed.fields.join(",")).toBe('tempi,conds,wspdi')
		expect(processed.observations.length).toBe(7)
	})

	//generic behaviors
	it('should remove improper values such as N/A , -9999, and -999', function() {
		processed = wuResponse(data.allBadValues, ['tempi','dewpti','humi'], location, summaryFields)
		expect(processed.observations[0].tempi).toBe(0)
		expect(processed.observations[0].dewpti).toBe(0)
		expect(processed.observations[0].humi).toBe(0)
	})

})