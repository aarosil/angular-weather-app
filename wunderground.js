var RateLimiter = require('limiter').RateLimiter;
var request = require('request');

var WUndergroundClient = function(apiKey, debug, rateCount, ratePeriod) {

    if (rateCount && ratePeriod) { var limiter = new RateLimiter(rateCount, ratePeriod); }

	var self = this;
	var format = '.json';

    console.log('Weather Underground Client initialized.\n**** apiKey: ' + apiKey + ', debug mode: ' + debug);
    if (limiter) { console.log('**** throttling request rate: ' + rateCount + ' per ' + ratePeriod); }

    var host = 'http://api.wunderground.com/api/' + apiKey;

    var get = function(cb, params, path){
    	var url  = host + path
    	if (debug) console.log('GET: ' + url)

        limiter.removeTokens(1, function (err, callbacks) {
            // err will only be set if we request more than the maximum number of
            // requests we set in the constructor

            // remainingRequests tells us how many additional requests could be sent
            // right this moment
            console.log('**** requests throttled, ' + limiter.getTokensRemaining() + ' remaining.');
            console.log(url)
            
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (debug) console.log('response body: ' + body);
                    cb(error, body);
                }
                else if (error) {
                    console.log('error: ' + err);
                }

            });
            
        });

    }

    self.conditions = function (query, cb) {
        var path = "/conditions/q/" + query + format;
        get(cb, null, path);
    };

    self.history = function (query, date, cb) {
        var path = "/history_" + date + "/q/" + query + format;
        get(cb, null, path);
    };

} 

module.exports = WUndergroundClient;


