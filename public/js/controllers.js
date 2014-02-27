var weatherControllers = angular.module('weatherControllers', ['weatherDirectives']);

weatherControllers.controller('NavCtrl', ['$scope', '$location',
	function($scope, $location) {
		//highlight navbar if section matches browser URL
        $scope.highlight = function (regexp) {
            return RegExp(regexp).test($location.path());
        };
	}
]);

weatherControllers.controller('modalCtrl', ['$scope', '$modalInstance', 
	function($scope, $modalInstance) {
		$scope.ok = $scope.cancel =function () {
			$modalInstance.close();
		};
	}
]);

weatherControllers.controller('WeatherCtrl', ['$scope', '$modal', 'WeatherSvc',
	function($scope, $modal, WeatherSvc) {

		$scope.weatherSvc = WeatherSvc;
		$scope.coords = {};
		$scope.formData = {};
		$scope.weatherData = {};
  		$scope.format = 'yyyy/MM/dd';
  		$scope.graphStates = {}; //store collapse/open state of graphs
  		$scope.rawStates = {}; //store collapse/open state of raw data
  		$scope.displayNames = [
  			{name: 'tempi', displayName: 'Temperature', order: 0},
  			{name: 'hum', displayName: 'Humidity', order: 1},
  			{name: 'precipi', displayName: 'Precipitation', order:2},
  			{name: 'conds', displayName: 'Cloud Cover', order: 3}
  		];

  		//used in raw data table to show human readable date
  		$scope.date = function(date) {return new Date(date);}

		$scope.getLocation = function () {
			//get user coordinates using  HTML5 GeoLocation API in Browser
			//Only Modern Browsers supported
			$scope.weatherSvc.getUserLocation().then(function(data){
				$scope.coords = {lat:data.coords.latitude, lng:data.coords.longitude};
				$scope.formData.location = $scope.coords.lat + "," + $scope.coords.lng;
				$scope.formData.locationValidationMessage = "";
			});
		}

		//listen for error message from GeoLocation service
		$scope.$on('geolocation_error', function(event, message){
			console.log(event)
			$scope.formData.geolocationErrorMessage = message;
		})

		$scope.parseUserLocation = function (loadWeather) {
			//if HTML5 Geolocation API fails or is denied
			//get coordinates from user entered location
			if ($scope.formData.location) {
				$scope.weatherSvc.geocodeUserInput($scope.formData.location).then(function(data){
					$scope.coords = data;
					if (loadWeather) {$scope.loadWeather();}
				}, function (error) {
					console.log("Error parsing user location: " + error);
					$scope.formData.locationValidationMessage = "No matching locations";
				})
			}
		}

		$scope.onLocationChange = function() {
			//clear coords and the location err msg 
			//when the user starts typing a location
			$scope.coords = {};
			$scope.formData.locationValidationMessage = "";
		}

		$scope.validateDateRange = function () {
			//ensure the two entered dates are not more than 9 days apart
			//and the start date is less than the end date
			function validate(s,e) {
				if (!s) return
				
				var s = s.getTime();
				var e = e ? e.getTime() : null;
				var minStart = (new Date).getTime() - 86400000;
				var maxEnd = s + (9 * 86400000) 

				if ( s > minStart ) { return "Start Date must be more than one day ago"; }
				if ( e && (s > minStart||e > minStart) ) { return "All dates must be in the past"; }
				if ( e && (e < s) ) { return "End Date cannot be before Start Date"; }
				if ( e && (e > maxEnd) ) { return "Maximum report length is 9 days"; }
				
				return null;
			}

			$scope.formData.dateValidationMessage = validate($scope.formData.historyStart, $scope.formData.historyEnd);
	
		}

		$scope.loadWeather = function () {
			// proceed only if coordinates have been set already
			// otherwise parse the form entry into lat/lng and call again
			if (!$scope.coords.lat && !$scope.coords.lng) {
				$scope.parseUserLocation(true);
				return;			
			}
			var query  = $scope.coords.lat + "," + $scope.coords.lng;
			// get the historical form of data if the 
			// start date, or start and end date were entered
			if (($scope.formData.historyStart && $scope.formData.historyEnd)||
				$scope.formData.historyStart) {

				var start = $scope.formData.historyStart.getTime()
				var end = $scope.formData.historyEnd ? $scope.formData.historyEnd.getTime() : null

				$scope.weatherSvc.getHistoricalWeather({query: query, startDate: start, endDate: end}).then(function(data){
					$scope.graphStates = {}; //all graphs = show
					$scope.weatherData = data[0];
					var cloudy =  parseInt(100 * data[0].cloudyDaylightHours,10);
					$scope.weatherData.clouds = [ 
							{status: "Cloudy" , value: cloudy},
							{status: "Clear" , value: 100 - cloudy }
						];
					$scope.weatherMode = 'historical';
				})

			//no dates entered, so get current weather for the location
			} else {
				$scope.weatherSvc.getCurrentWeather({query: query})
					.then(function(data){
						$scope.weatherData.current = data;
						$scope.weatherMode = 'current';
					})
			}
			
		}

		$scope.instructions = function() {
			var modalInstance = $modal.open({
				templateUrl: 'tpl/instructionsModal.html',
				controller: 'modalCtrl'
			});
		};	

	}
]);