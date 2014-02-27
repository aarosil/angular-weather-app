var weatherServices = angular.module('weatherServices', ['ngResource']);

//geolocation error messages
weatherServices.constant('geolocation_msgs', {
        'errors.location.unsupportedBrowser':'Browser does not support location services',
        'errors.location.permissionDenied':'You have rejected access to your location',
        'errors.location.positionUnavailable':'Unable to determine your location',
        'errors.location.timeout':'Service timeout has been reached'
})

//angular interface to window.navigator.geolocation object
//**code adapted from module found on github**
weatherServices.factory('GeoLocation', ['$q', '$rootScope', '$window', 'geolocation_msgs',
	function($q, $rootScope, $window, geolocation_msgs) {
		return {
			getLocation: function(opts) {
				var deferred = $q.defer();
				if ($window.navigator && $window.navigator.geolocation) {
					$window.navigator.geolocation.getCurrentPosition(function(position){
					$rootScope.$apply(function(){deferred.resolve(position);});
					}, function(error) {
						switch (error.code) {
						case 1:
						$rootScope.$broadcast('geolocation_error',geolocation_msgs['errors.location.permissionDenied']);
						$rootScope.$apply(function() {
							deferred.reject(geolocation_msgs['errors.location.permissionDenied']);
						});
						break;
						case 2:
						$rootScope.$broadcast('geolocation_error',geolocation_msgs['errors.location.positionUnavailable']);
						$rootScope.$apply(function() {
							deferred.reject(geolocation_msgs['errors.location.positionUnavailable']);
						});
						break;
						case 3:
						$rootScope.$broadcast('geolocation_error',geolocation_msgs['errors.location.timeout']);
						$rootScope.$apply(function() {
							deferred.reject(geolocation_msgs['errors.location.timeout']);
						});
						break;    
		            }
		          }, opts);  
		        } else {
		          $rootScope.$broadcast('geolocation_error',geolocation_msgs['errors.location.unsupportedBrowser']);
		          $rootScope.$apply(function(){deferred.reject(geolocation_msgs['errors.location.unsupportedBrowser']);});		        	
		        }
		        return deferred.promise;          
			}
		}
	}]);

//angular resource for node backend weather endpoint
//supports two methods getCurrent and getHistorical
weatherServices.factory('Weather', ['$resource', 
	function($resource){
		return $resource('/weather', {query: '@query'}, {
			getCurrent: {
				method: 'GET', url:'/weather/:query'
			}, 
			getHistorical: {
				method: 'GET', 
				url:'/history/:query/:startDate/:endDate', 
				isArray:true,
				params: {startDate: '@startDate', endDate: '@endDate'}
			}
		})
	}]);

//angular resource for google Maps geocoding API
//used to convert user entered location to lat/long 
weatherServices.factory('ReverseGeoLocation', ['$resource', 
	function($resource){
		return $resource('/geocode', {address: '@location'}, {
			getLatLong: {
				method: 'GET', url:'/geocode/:location'
			}
		})
	}])

//generic weather services factory used in controllers
//abstracts all the  above services into one module
weatherServices.factory('WeatherSvc', ['Weather', 'GeoLocation', 'ReverseGeoLocation', 
	function(Weather, GeoLocation, ReverseGeoLocation){
		var wSvc = {};

		wSvc.getCurrentWeather = function(location) {
			return Weather.getCurrent(location).$promise;
		};

		wSvc.getHistoricalWeather = function(location, dates) {
			return Weather.getHistorical(location, dates).$promise;
		}

		wSvc.getUserLocation = function() {
			return GeoLocation.getLocation();
		};

		wSvc.geocodeUserInput = function (location) {
			return ReverseGeoLocation.getLatLong({location: location}).$promise;
		}

		return wSvc;
	}])

