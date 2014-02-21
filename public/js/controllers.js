var weatherControllers = angular.module('weatherControllers', ['weatherDirectives']);

weatherControllers.controller('HomeCtrl', ['$scope',
	function($scope) {
		$scope.homeMsg = "WeatherStation lets you view current or historical weather conditions for your location.";
	}
]);

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
  		// data for testing
		//$scope.weatherData.tempi = {"key":"tempi","values":[[1393401600000,37],[1393405200000,35],[1393405200000,35],[1393408800000,35],[1393412400000,35],[1393412400000,35],[1393412400000,34],[1393416000000,35],[1393419600000,35],[1393423200000,37],[1393426800000,37],[1393430400000,37],[1393434000000,37],[1393437600000,39],[1393441200000,42],[1393441200000,43],[1393444800000,45],[1393448400000,44],[1393452000000,44],[1393455600000,44],[1393459200000,43],[1393462800000,42],[1393466400000,42],[1393470000000,41],[1393470000000,41],[1393473600000,39],[1393473600000,39],[1393477200000,39],[1393477200000,39],[1393480800000,39],[1393480800000,39],[1393484400000,39],[1393484400000,39],[1393488000000,39],[1393488000000,39],[1393488000000,39],[1393488000000,39],[1393491600000,39],[1393495200000,39],[1393495200000,37],[1393498800000,37],[1393502400000,37],[1393506000000,37],[1393509600000,36],[1393513200000,36],[1393516800000,37],[1393520400000,37],[1393520400000,37],[1393520400000,37],[1393524000000,39],[1393527600000,41],[1393527600000,41],[1393531200000,42],[1393534800000,41],[1393534800000,42],[1393534800000,43],[1393538400000,44],[1393542000000,44],[1393545600000,42],[1393549200000,42],[1393552800000,43],[1393556400000,43],[1393560000000,42],[1393563600000,43],[1393567200000,44],[1393570800000,48],[1393574400000,46],[1393578000000,44],[1393581600000,44],[1393585200000,45],[1393588800000,44],[1393592400000,44],[1393596000000,45],[1393599600000,46],[1393603200000,46],[1393606800000,46],[1393610400000,48],[1393614000000,48],[1393617600000,50],[1393621200000,51],[1393624800000,51],[1393628400000,52],[1393632000000,51],[1393635600000,50],[1393639200000,50],[1393639200000,50],[1393639200000,50],[1393642800000,48],[1393646400000,48],[1393650000000,48],[1393653600000,46],[1393653600000,46],[1393657200000,46],[1393660800000,46],[1393664400000,46],[1393668000000,46],[1393671600000,46],[1393675200000,46],[1393678800000,46],[1393682400000,46],[1393686000000,46],[1393686000000,46],[1393689600000,48],[1393693200000,50],[1393696800000,51],[1393696800000,50],[1393696800000,51],[1393696800000,53],[1393700400000,53],[1393704000000,53],[1393704000000,51],[1393704000000,52],[1393707600000,52],[1393711200000,51],[1393711200000,48],[1393711200000,48],[1393714800000,48],[1393714800000,48],[1393714800000,48],[1393718400000,48],[1393722000000,48],[1393725600000,48],[1393729200000,48],[1393729200000,46],[1393732800000,46],[1393736400000,46],[1393736400000,46],[1393740000000,46],[1393743600000,46],[1393743600000,46],[1393660800000,43],[1393664400000,43],[1393668000000,43],[1393671600000,42],[1393675200000,41],[1393675200000,39],[1393678800000,41],[1393682400000,39],[1393686000000,41],[1393686000000,41],[1393689600000,43],[1393693200000,44],[1393696800000,44],[1393700400000,43],[1393704000000,45],[1393707600000,46],[1393711200000,46],[1393714800000,46],[1393718400000,46],[1393722000000,43],[1393725600000,42],[1393729200000,39],[1393732800000,37],[1393736400000,37],[1393736400000,37],[1393736400000,37],[1393736400000,37],[1393736400000,37],[1393740000000,37],[1393743600000,37],[1393743600000,37],[1393743600000,37],[1393747200000,46],[1393750800000,46],[1393754400000,46],[1393758000000,46],[1393761600000,46],[1393765200000,46],[1393768800000,46],[1393772400000,46],[1393776000000,46],[1393779600000,46],[1393783200000,48],[1393786800000,48],[1393790400000,48],[1393794000000,48],[1393797600000,46],[1393801200000,46],[1393804800000,46],[1393808400000,46],[1393812000000,45],[1393815600000,44],[1393819200000,44],[1393822800000,44],[1393826400000,45],[1393830000000,45],[1393833600000,44],[1393833600000,44],[1393837200000,45],[1393840800000,45],[1393844400000,44],[1393848000000,44],[1393848000000,44],[1393851600000,43],[1393855200000,42],[1393855200000,42],[1393855200000,43],[1393858800000,42],[1393858800000,43],[1393862400000,42],[1393866000000,42],[1393866000000,42],[1393869600000,42],[1393869600000,43],[1393873200000,44],[1393873200000,44],[1393876800000,46],[1393880400000,46],[1393884000000,46],[1393887600000,46],[1393891200000,46],[1393894800000,45],[1393898400000,45],[1393902000000,44],[1393905600000,42],[1393909200000,43],[1393912800000,43],[1393916400000,43]]}

		$scope.getLocation = function () {
			//get user coordinates using  HTML5 GeoLocation API in Browser
			//Only Modern Browsers supported
			$scope.weatherSvc.getUserLocation().then(function(data){
				$scope.coords = {lat:data.coords.latitude, lng:data.coords.longitude};
				$scope.formData.location = $scope.coords.lat + "," + $scope.coords.lng;
			});
		}

		$scope.parseUserLocation = function (loadWeather) {
			//if HTML5 Geolocation API fails or is denied
			//get coordinates from user entered location
			if ($scope.formData.location) {
				$scope.weatherSvc.geocodeUserInput($scope.formData.location).then(function(data){
					$scope.coords = data;
					if (loadWeather) {$scope.loadWeather()}
				})
			}
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
				if ( e && e > s ) { return "End Date cannot be before Start Date"; }
				if ( e && e > maxEnd) { return "Maximum report length is 9 days"; }
				
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

				console.log('start: ' + start + ' end: ' + end)

				$scope.weatherSvc.getHistoricalWeather({query: query, startDate: start, endDate: end}).then(function(data){
					$scope.historicalData = data;
					$scope.weatherData.tempi=data[0].tempi;
					$scope.weatherData.hum=data[0].hum;
					$scope.weatherData.precipi=data[0].precipi;;
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