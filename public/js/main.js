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

// translates object to an array so
// we can use ngRepeat orderBy on it
weatherApp.filter('object2Array', function() {
	return function(input) {
		var out = []; 
		for(i in input){
			out.push(input[i]);
		}
		return out;
	}
})

// inject a blank HTTP interceptor that
// will be configured by spinGif directive
weatherApp.config(['$provide', '$httpProvider', 
	function($provide, $httpProvider){
		$provide.factory('weatherHttpInterceptor', function(){
			return {}
		});
		$httpProvider.interceptors.push('weatherHttpInterceptor');	
	} ]);