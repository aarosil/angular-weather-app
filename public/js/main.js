var weatherApp = angular.module('weatherApp', [
		'ngRoute',
		'ngCookies',
		'weatherControllers',
		'weatherServices',
		'weatherDirectives',
		'ui.bootstrap', 
		'd3'
	]);

weatherApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'tpl/home.html'
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


weatherApp.filter('object2Array', function() {
	return function(input) {
		var out = []; 
		for(i in input){
			out.push(input[i]);
		}
		return out;
	}
})