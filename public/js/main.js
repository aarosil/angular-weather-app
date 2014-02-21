var weatherApp = angular.module('weatherApp', [
		'ngRoute',
		'ngCookies',
		'weatherControllers',
		'weatherServices',
		'weatherDirectives',
		'ui.bootstrap', 
		'd3'
		//'nvd3ChartDirectives'
	]);

weatherApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'tpl/home.html',
				controller: 'HomeCtrl'
			}).
			when('/weather', {
				templateUrl: 'tpl/weather.html',
				controller: 'WeatherCtrl'
			}).	
			when('/reports', {
				templateUrl: 'tpl/reports.html'
			}).
			when('/about', {
				templateUrl: 'tpl/about.html'
			}).
			otherwise({
				redirectTo: '/'
			})
	}]);
