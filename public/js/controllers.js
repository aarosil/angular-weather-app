var weatherControllers = angular.module('weatherControllers', ['weatherDirectives']);

weatherControllers.controller('HomeCtrl', ['$scope',
	function($scope){
		$scope.weatherData = {"summary":[{"time":1393012800000,"avg_tempi":38.627027027027026,"avg_hum":93.37837837837837,"avg_precipi":0.006956521739130436,"avg_conds":0.8445945945945946,"avg_dewpti":36.76216216216216,"avg_wspdi":8.075675675675674,"avg_pressurei":29.85081081081081,"day_conds":100},{"time":1393099200000,"avg_tempi":43.166666666666664,"avg_hum":49.916666666666664,"avg_precipi":0,"avg_conds":0,"avg_dewpti":23.087500000000002,"avg_wspdi":5.095454545454545,"avg_pressurei":29.9825,"day_conds":0},{"time":1393185600000,"avg_tempi":43.3125,"avg_hum":51.708333333333336,"avg_precipi":0,"avg_conds":0.4722222222222222,"avg_dewpti":25.904166666666672,"avg_wspdi":4.237500000000001,"avg_pressurei":29.930000000000007,"day_conds":11.4},{"time":1393272000000,"avg_tempi":31.825,"avg_hum":44.666666666666664,"avg_precipi":0,"avg_conds":0.34375,"avg_dewpti":12.266666666666671,"avg_wspdi":14.920833333333333,"avg_pressurei":29.908749999999994,"day_conds":22.7},{"time":1393358400000,"avg_tempi":24.137037037037036,"avg_hum":53.592592592592595,"avg_precipi":0,"avg_conds":0.48,"avg_dewpti":9.344444444444443,"avg_wspdi":9.307407407407409,"avg_pressurei":30.001481481481484,"day_conds":60.699999999999996},{"time":1393444800000,"avg_tempi":21.996551724137934,"avg_hum":55.58620689655172,"avg_precipi":0,"avg_conds":0.625,"avg_dewpti":7.382758620689656,"avg_wspdi":8.554166666666667,"avg_pressurei":29.885862068965523,"day_conds":82.8},{"time":1393531200000,"avg_tempi":19.142307692307693,"avg_hum":44.15384615384615,"avg_precipi":0,"avg_conds":0.4605263157894737,"avg_dewpti":-0.026923076923077032,"avg_wspdi":11.978260869565217,"avg_pressurei":29.775769230769235,"day_conds":46.2},{"time":1393617600000,"avg_tempi":13.2125,"avg_hum":42.041666666666664,"avg_precipi":0,"avg_conds":0,"avg_dewpti":-6.499999999999999,"avg_wspdi":8.35833333333333,"avg_pressurei":30.340833333333332,"day_conds":0},{"time":1393704000000,"avg_tempi":24.337500000000006,"avg_hum":52.541666666666664,"avg_precipi":0,"avg_conds":0.7954545454545454,"avg_dewpti":8.799999999999999,"avg_wspdi":3.649999999999999,"avg_pressurei":30.31291666666667,"day_conds":4.5},{"time":1393790400000,"avg_tempi":33.63750000000001,"avg_hum":52.583333333333336,"avg_precipi":0,"avg_conds":0.9375,"avg_dewpti":17.80416666666667,"avg_wspdi":5.729166666666667,"avg_pressurei":30.04583333333333,"day_conds":93.2}]}
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
	  			tempi: {name: 'tempi', displayName: 'Temperature', order: 0, active: true, units: "F"},
	  			hum: {name: 'hum', displayName: 'Humidity', order: 3, active: false, units: "%"},
	  			precipi: {name: 'precipi', displayName: 'Precipitation', order:2, active: false, units: "in"},
	  			conds: {name: 'conds', displayName: 'Cloud Cover', order: 1, active: true, units: "%"},  
	  			dewpti: {name: 'dewpti', displayName: 'Dewpoint', order: 4, active: false, units: "F"},
	  			wspdi: {name: 'wspdi', displayName: 'Wind Speed', order: 5, active: false, units: "kn"},
	  			pressurei: {name: 'pressurei', displayName: 'Pressure', order: 6, active: false, units: "inHg"} 	 			
  			}, 
  			summary: {
  				day_conds: {name: 'day_conds', displayName: 'Avg Daytime Cloud Cover', order: 0, active: true, units: "%"},
	  			avg_tempi: {name: 'tempi', displayName: 'Avg Temperature', order: 2, active: false, units: "F"},
	  			avg_hum: {name: 'hum', displayName: 'Avg Humidity', order: 4, active: false, units: "%"},
	  			avg_precipi: {name: 'precipi', displayName: 'Avg Precipitation', order:3, active: false, units: "in"},
	  			avg_conds: {name: 'conds', displayName: 'Avg Cloud Cover', order: 1, active: false, units: "%"},  
	  			avg_dewpti: {name: 'dewpti', displayName: 'Avg Dewpoint', order: 5, active: false, units: "F"},
	  			avg_wspdi: {name: 'wspdi', displayName: 'Avg Wind Speed', order: 6, active: false, units: "kn"},
	  			avg_pressurei: {name: 'pressurei', displayName: 'Avg Pressure', order: 7, active: false, units: "inHg"} 		  				
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