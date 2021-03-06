var weatherControllers = angular.module('weatherControllers', ['weatherDirectives']);

weatherControllers.controller('HomeCtrl', ['$scope', 'sampleData',
	function($scope, data){
		console.log(data)
		$scope.weatherData = data
		$scope.label = "Temperature";
		$scope.units = "F";
		$scope.key = 'avg_tempi';	
	}
])

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
  		$scope.dataFields = {  
  			observation: {	// automatically display the correct name in charts	
	  			tempi: {name: 'tempi', displayName: 'Temperature', order: 0, active: true, units: "\xB0 F"},
	  			hum: {name: 'hum', displayName: 'Humidity', order: 3, active: false, units: "%"},
	  			precipi: {name: 'precipi', displayName: 'Precipitation', order:2, active: false, units: " in"},
	  			conds: {name: 'conds', displayName: 'Cloud Cover', order: 1, active: true, units: "%"},  
	  			dewpti: {name: 'dewpti', displayName: 'Dewpoint', order: 4, active: false, units: "\xB0 F"},
	  			wspdi: {name: 'wspdi', displayName: 'Wind Speed', order: 5, active: false, units: " kn"},
	  			pressurei: {name: 'pressurei', displayName: 'Pressure', order: 6, active: false, units: " inHg"} 	 			
  			}, 
  			summary: {
  				day_conds: {name: 'day_conds', displayName: 'Avg Daytime Cloud Cover', order: 0, active: true, units: " %"},
	  			avg_tempi: {name: 'tempi', displayName: 'Avg Temperature', order: 2, active: false, units: "\xB0 F"},
	  			avg_hum: {name: 'hum', displayName: 'Avg Humidity', order: 4, active: false, units: "%"},
	  			avg_precipi: {name: 'precipi', displayName: 'Avg Precipitation', order:3, active: false, units: " in"},
	  			avg_conds: {name: 'conds', displayName: 'Avg Cloud Cover', order: 1, active: false, units: "%"},  
	  			avg_dewpti: {name: 'dewpti', displayName: 'Avg Dewpoint', order: 5, active: false, units: "\xB0 F"},
	  			avg_wspdi: {name: 'wspdi', displayName: 'Avg Wind Speed', order: 6, active: false, units: " kn"},
	  			avg_pressurei: {name: 'pressurei', displayName: 'Avg Pressure', order: 7, active: false, units: " inHg"} 		  				
  			}
  		};

  		//used in raw data table to show human readable date
  		$scope.date = function(date) {return new Date(date);}
		// gets an attr of the key name such as the displayName 
		// or the units.
  		$scope.getAttr = function(key, attr) { 
			return $scope.dataFields.observation.hasOwnProperty(key) ? $scope.dataFields.observation[key][attr] : $scope.dataFields.summary[key][attr]
  		}

		$scope.getLocation = function () {
			//get user coordinates using  HTML5 GeoLocation API in Browser
			//Only Modern Browsers supported
			$scope.weatherSvc.getUserLocation().then(function(data){
				$scope.coords = {lat:data.coords.latitude, lng:data.coords.longitude};
				$scope.formData.location = $scope.coords.lat + "," + $scope.coords.lng;
				clearErrorMessages();
			});
		}

		//listen for error message from GeoLocation service
		$scope.$on('geolocation_error', function(event, message){
			$scope.formData.geolocationErrorMessage = "Error: " + message + ".  Enter a location manually.";
		})

		$scope.parseUserLocation = function (loadWeather) {
			//if HTML5 Geolocation API fails or is denied
			//get coordinates from user entered location
			if ($scope.formData.location) {
				$scope.weatherSvc.geocodeUserInput($scope.formData.location).then(function(data){
					$scope.coords = data;
					if (loadWeather) {$scope.loadWeather();}
				}, function (error) {
					$scope.formData.locationValidationMessage = "No matching locations";
				})
			}
		}

		$scope.onLocationChange = function() {
			//clear coords and the location err msgs 
			//when the user starts typing a location
			$scope.coords = {};
			clearErrorMessages();
		}

		function clearErrorMessages() {
			$scope.formData.locationValidationMessage = "";
			$scope.formData.geolocationErrorMessage = "";
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

				var fields = [];
				for (key in $scope.dataFields.observation) {
					if ($scope.dataFields.observation[key].active === true) {
						fields.push($scope.dataFields.observation[key].name)
					} 
				}
				var summaryFields = [];				
				for (key in $scope.dataFields.summary) {
					if ($scope.dataFields.summary[key].active === true && key!=='day_conds') {
						summaryFields.push($scope.dataFields.summary[key].name)
					} 
				}

				var request = {
					query: query, 
					startDate: start, 
					endDate: end, 
					fields: fields.join(','),
					summaryFields: summaryFields.join(',')
				}
				$scope.weatherSvc.getHistoricalWeather(request).then(function(data){
					$scope.graphStates = {}; //all graphs = show
					$scope.weatherData = data
					// calculate avg daily cloudiness over the duration
					var cloudyTotal = data.summary.reduce(function(a,b){return a + b.day_conds},0)/data.summary.length;	
					$scope.weatherData.totals = {clouds: [ 
													{status: "Cloudy" , value: cloudyTotal},
													{status: "Clear" , value: 100 - cloudyTotal }
												]};
					// make visible the HTML
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

SampleData = {
	sampleData: function($q){
		var d = $q.defer()
		data = {"summary":[{"time":1393012800000,"avg_tempi":38.627027027027026},{"time":1393099200000,"avg_tempi":43.166666666666664},{"time":1393185600000,"avg_tempi":43.3125},{"time":1393272000000,"avg_tempi":31.825,},{"time":1393358400000,"avg_tempi":24.137037037037},{"time":1393444800000,"avg_tempi":21.996551724137934},{"time":1393531200000,"avg_tempi":19.142307692307693},{"time":1393617600000,"avg_tempi":13.2125},{"time":1393704000000,"avg_tempi":24.3375000000000},{"time":1393790400000,"avg_tempi":33.63750000000}]}
		d.resolve(data)
		return d.promise
	}

}