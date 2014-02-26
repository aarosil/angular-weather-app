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
    $httpBackend.when('GET', '/history/37.7749295,-122.4194155/1391328000000/1391414400000').respond([{"tempi":{"key":"tempi","values":[[1393750560000,"48.9"],[1393754160000,"48.9"]]}}])
    $httpBackend.when('GET', '/history/37.7749295,-122.4194155/1391328000000').respond([{"tempi":{"key":"tempi","values":[[1393754160000,"48.9"]]}}])
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
    expect($scope.weatherData.tempi.values.length).toEqual(2);
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
    expect($scope.weatherData.tempi.values.length).toEqual(1);
    expect($scope.weatherMode).toEqual('historical');
  })

});