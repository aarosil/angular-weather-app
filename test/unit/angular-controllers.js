describe('Controllers', function(){
  beforeEach(function(){
    module('weatherControllers');
    module('weatherServices');
    module('weatherDirectives');
    module('ui.bootstrap');
    module('d3');
  })

  var $scope, $location, $rootScope, $controller, $httpBackend;

  beforeEach(inject(function($injector) {
    $location = $injector.get('$location');
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/geocode/San%20Francisco?').respond({lat:37.7749295,lng:-122.4194155})
    $httpBackend.when('GET', '/weather/37.7749295,-122.4194155').respond({"weather":"Mostly Cloudy","temp_f":30,"temp_c":-1,"relative_humidity":"40%","wind_string":"","dewpoint_string":"14 F (-10 C)"})
    $httpBackend.when('GET', '/history/37.7749295,-122.4194155/1391328000000/1391414400000').respond({"fields":["tempi","hum","pressurei","precipi","fog","rain","snow","conds"],"values":[{"time":1391331360000,"tempi":48.9,"hum":77,"pressurei":30.04,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391334960000,"tempi":48.9,"hum":69,"pressurei":30.04,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391338560000,"tempi":48.9,"hum":61,"pressurei":30.01,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391342160000,"tempi":48,"hum":68,"pressurei":29.98,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391345760000,"tempi":48,"hum":71,"pressurei":29.95,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391349360000,"tempi":48.9,"hum":69,"pressurei":29.93,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391352960000,"tempi":46.9,"hum":83,"pressurei":29.92,"precipi":0.05,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391356560000,"tempi":48,"hum":80,"pressurei":29.9,"precipi":0.09,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391360160000,"tempi":48,"hum":86,"pressurei":29.86,"precipi":0.07,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391363760000,"tempi":48,"hum":83,"pressurei":29.89,"precipi":0.06,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391364840000,"tempi":48.2,"pressurei":29.9,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391365140000,"tempi":48.2,"hum":82,"pressurei":29.9,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1}],"summary":[{"time":1391371200000,"avgdaycloudy":86.1}]})
    $httpBackend.when('GET', '/history/37.7749295,-122.4194155/1391328000000').respond({"fields":["tempi","hum","pressurei","precipi","fog","rain","snow","conds"],"values":[{"time":1391331360000,"tempi":48.9,"hum":77,"pressurei":30.04,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391334960000,"tempi":48.9,"hum":69,"pressurei":30.04,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391338560000,"tempi":48.9,"hum":61,"pressurei":30.01,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391342160000,"tempi":48,"hum":68,"pressurei":29.98,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391345760000,"tempi":48,"hum":71,"pressurei":29.95,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391349360000,"tempi":48.9,"hum":69,"pressurei":29.93,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391352960000,"tempi":46.9,"hum":83,"pressurei":29.92,"precipi":0.05,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391356560000,"tempi":48,"hum":80,"pressurei":29.9,"precipi":0.09,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391360160000,"tempi":48,"hum":86,"pressurei":29.86,"precipi":0.07,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391363760000,"tempi":48,"hum":83,"pressurei":29.89,"precipi":0.06,"fog":0,"rain":1,"snow":0,"conds":1}],"summary":[{"time":1391371200000,"avgdaycloudy":86.1}]})
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();    
  })

  var controller="";

  //Nav Ctrl
  it('Nav Ctrl should have a method to check if the path is active', function() {
    controller = $controller('NavCtrl', {'$scope': $scope});
    $location.path('/weather');
    expect($location.path()).toBe('/weather');
    expect($scope.highlight('/weather')).toBe(true);
    expect($scope.highlight('/garbage')).toBe(false);
  });

  //Weather Controller
  it('WeatherCtrl should be able to access browser GeoLocation service', function () {
    controller = $controller('WeatherCtrl', {'$scope': $scope});   
    expect(angular.isFunction($scope.weatherSvc.getUserLocation)).toBe(true);
  })

  it('WeatherCtrl should translate user entered location to lat/lng', function() {
    controller = $controller('WeatherCtrl', {'$scope': $scope});
    $scope.formData.location = "San Francisco"
    $scope.$apply(function(){
      $scope.parseUserLocation();
    })
    $httpBackend.flush();
    expect($scope.coords.lat).toEqual(37.7749295)
    expect($scope.coords.lng).toEqual(-122.4194155)
  })

  it('WeatherCtrl should retrieve the current weather with no dates entered', function() { 
    controller = $controller('WeatherCtrl', {'$scope': $scope});
    $scope.coords = {lat: 37.7749295, lng: -122.4194155}
    $scope.formData.historyStart = ""
    $scope.formData.historyEnd = ""
    $scope.$apply(function(){
      $scope.loadWeather();
    })
    $httpBackend.flush();
    expect($scope.weatherData.current.temp_f).toEqual(30)
    expect($scope.weatherMode).toEqual('current')
  })

  var date = new Date()
  var yesterday = new Date(date.getDate()-1)

  it('WeatherCtrl verifies the start date entered is not more than 1 day ago', function() {
    controller = $controller('WeatherCtrl', {'$scope': $scope});
    $scope.formData.historyStart = date
    $scope.validateDateRange()
    expect($scope.formData.dateValidationMessage).not.toEqual(null)
    $scope.formData.historyStart = yesterday
    $scope.validateDateRange()
    expect($scope.formData.dateValidationMessage).toEqual(null)
  })

  it('WeatherCtrl should retrieve historical weather for start/end days', function() {
    controller = $controller('WeatherCtrl', {'$scope': $scope});
    $scope.coords = {lat: 37.7749295, lng: -122.4194155};
    $scope.formData.historyStart = new Date(1391328000000);
    $scope.formData.historyEnd = new Date(1391414400000);
    $scope.$apply(function(){
      $scope.loadWeather();
    })
    $httpBackend.flush();
    expect($scope.weatherData.tempi.length).toEqual(12);
    expect($scope.weatherMode).toEqual('historical');
  })

  it('WeatherCtrl should request historical weather for start dates only', function(){
    controller = $controller('WeatherCtrl', {'$scope': $scope});
    $scope.coords = {lat: 37.7749295, lng: -122.4194155};
    $scope.formData.historyStart = new Date(1391328000000);
    $scope.formData.historyEnd ="";
    $scope.$apply(function(){
      $scope.loadWeather();
    })
    $httpBackend.flush();
    expect($scope.weatherData.tempi.length).toEqual(10);
    expect($scope.weatherMode).toEqual('historical');
  })

});


//var testdata = {"fields":["tempi","hum","pressurei","precipi","fog","rain","snow","conds"],"values":[{"time":1391331360000,"tempi":48.9,"hum":77,"pressurei":30.04,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391334960000,"tempi":48.9,"hum":69,"pressurei":30.04,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391338560000,"tempi":48.9,"hum":61,"pressurei":30.01,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391342160000,"tempi":48,"hum":68,"pressurei":29.98,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391345760000,"tempi":48,"hum":71,"pressurei":29.95,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391349360000,"tempi":48.9,"hum":69,"pressurei":29.93,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391352960000,"tempi":46.9,"hum":83,"pressurei":29.92,"precipi":0.05,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391356560000,"tempi":48,"hum":80,"pressurei":29.9,"precipi":0.09,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391360160000,"tempi":48,"hum":86,"pressurei":29.86,"precipi":0.07,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391363760000,"tempi":48,"hum":83,"pressurei":29.89,"precipi":0.06,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391364840000,"tempi":48.2,"pressurei":29.9,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391365140000,"tempi":48.2,"hum":82,"pressurei":29.9,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1}],"summary":[{"time":1391371200000,"avgdaycloudy":86.1}];}