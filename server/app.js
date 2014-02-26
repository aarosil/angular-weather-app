/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var wsvc = require('../app/weather-svc');
var app = express();

/**
 * Configurations.
 */
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * Assign Routes.
 */
app.get('/weather/:query', wsvc.getCurrentWeather);
app.get('/history/:query/:startDate/:endDate', wsvc.getHistory);
app.get('/history/:query/:startDate', wsvc.getHistory);
app.get('/geocode/:location', wsvc.getLatLong);

/**
 * Start Server.
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log("Server listening on port " + app.get('port'));
});

