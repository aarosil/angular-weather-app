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
/**
Process historical observations and return data as such:
{
fields: ['field1', 'field2'],
summaryFields: ['avg_field1', 'avg_field2'],
observations: [
	{time: 1, field1: 50, field2: 70},
	{time: 2, field1: 50, field2: 70},
	...
] ,
summary: [
	{time: 1, avg_field1: 75, avg_field2: 66},
	{time: 2, avg_field1: 71, avg_field2: 57},
	...
],
}
**/

	it('should calculate the average daytime cloud cover properly', function(){
		// only daytime observations should influence day_conds
		summaryFields = ['tempi', 'conds', 'wspdi'];
		fields = ['tempi', 'conds', 'wspdi'];
		processed = wuResponse([data.feb26], fields, location, summaryFields)
		expect(processed.summaryData).not.toBe(null)
		expect(processed.summary[0].avg_wspdi).toBe(30)
		expect(processed.summary[0].avg_tempi).toBe(50)
		// all daytime observations were cloudy
		expect(processed.summary[0].day_conds).toBe(100)
		// only 3/4 total observations were cloudy
		expect(processed.summary[0].avg_conds).toBe(75)
		
	})

	it('should calculate the other averages properly, ignoring bad values in calculating the avg', function(){
		fields = ['tempi', 'conds', 'wspdi', 'hum'];
		summaryFields = ['tempi', 'conds', 'wspdi', 'hum'];
		processed = wuResponse([data.dayWithBadTemps], fields, location, summaryFields)
		expect(processed.summary[0].avg_tempi).toBe(50)
		expect(processed.summary[0].avg_conds).toBe(25)
		expect(processed.summary[0].avg_wspdi).toBe(30)
		expect(processed.summary[0].avg_hum).toBe(70)
	})

	// result has observation from both days 
	it('should process an array of "history" responses and return the fields as expected', function(){
		fields = ['tempi', 'conds', 'wspdi'];
		processed = wuResponse([data.feb27,data.feb26], fields, location, summaryFields)
		expect(processed.fields.join(",")).toBe('tempi,conds,wspdi')
		expect(processed.observations.length).toBe(7)
	})

	//generic behaviors
	it('should remove improper values such as N/A , -9999, and -999', function() {
		processed = wuResponse([data.allBadValues], ['tempi','dewpti','humi'], location, summaryFields)
		expect(processed.observations[0].tempi).toBe(0)
		expect(processed.observations[0].dewpti).toBe(0)
		expect(processed.observations[0].humi).toBe(0)
	})

})