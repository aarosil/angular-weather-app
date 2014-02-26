/*********************************
/ D3 service
/********************************/
describe('D3 Service', function(){

  beforeEach(module('d3'));

	var $service;	

	beforeEach(inject(function($injector) {
		$service = $injector.get('d3Service');
	}))

  var service = $service;

  it('should have a function d3', function(){
  	expect(angular.isFunction($service.d3)).toBe(true);
  })

  it('d3() should return an object that has a select and svg function', function() {
    $service.d3().then(function(d3){
      expect(angular.isFunction(d3.select)).toBe(true);
      expect(angular.isFunction(d3.svg)).toBe(true);      
    })
  })

})

/*********************************
/HTML5 Browser Geolocation Service
/********************************/
describe('GeoLocation service', function(){

  beforeEach(module('weatherServices'));

  var $service;

  beforeEach(inject(function($injector) {
  	$service = $injector.get('GeoLocation');
  }))

  it('returns an object with a getLocation function', function(){
  	expect(angular.isFunction($service.getLocation)).toBe(true);
  })

  it('getLocation function returns promise with user coords', function(){
  	//expect(angular.isFunction($window.navigator.geolocation.getCurrentPosition)).toBe(true)
  	var result = $service.getLocation()
  	expect(typeof result.then).toBe('function')
  	result.then(function(data){
  		expect(data.coords).not.toBe(undefined)
  		expect(typeof data.coords.longitude).toBe('number')
  	})
  })

})

/*********************************
/Google api service
/********************************/
describe('ReverseGeoLocation service', function(){
  beforeEach(module('weatherServices'));

  var $httpBackend, $service;

  beforeEach(inject(function($injector) {
  	$rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
  	$service = $injector.get('ReverseGeoLocation');
  	$httpBackend = $injector.get('$httpBackend');
  	$httpBackend.when('GET', '/geocode/San%20Francisco?').respond({lat:37.7749295,lng:-122.4194155})
  }))

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();    
  })

  var result = "";
  it('should call /geocode with the URL parameters', function() {
  	$scope.$apply(function(){
  		result = $service.getLatLong({location: 'San Francisco'})
  	})
  	$httpBackend.flush()
  })

  it('should have user coordinates in the results of its data', function () {
  	expect(result.lat).toBe(37.7749295)
  	expect(result.lng).toBe(-122.4194155)
  })

})

/*********************************
/Weather Underground service
/********************************/
describe('Weather', function(){

  beforeEach(module('weatherServices'));

  var $httpBackend, $service;

  beforeEach(inject(function($injector) {
  	$service = $injector.get('Weather');
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $service = $injector.get('Weather');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/weather/37.7749295,-122.4194155').respond({"weather":"Mostly Cloudy","temp_f":30,"temp_c":-1,"relative_humidity":"40%","wind_string":"","dewpoint_string":"14 F (-10 C)"})    
    $httpBackend.when('GET', '/history/37.7749295,-122.4194155/1391328000000/1391414400000').respond([{"tempi":{"key":"tempi","values":[[1393750560000,"48.9"],[1393754160000,"48.9"]]}}])
    $httpBackend.when('GET', '/history/37.7749295,-122.4194155/1391332000000/').respond([{"tempi":{"key":"tempi","values":[[1393750560000,"48.9"],[1393754160000,"48.9"],[1393754160000,"48.9"]]}}])
  }))

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();    
  })  

  it('should have a function "getCurrent"', function() {
    expect(angular.isFunction($service.getCurrent)).toBe(true)
  })

  var result = ""
  var query = "37.7749295,-122.4194155"
  
  it('getCurrent should call /weather with the URL parameters', function() {
    $scope.$apply(function(){
      $service.getCurrent({query: query}).$promise.then(function(data){
        result = data
      })
    })
    $httpBackend.flush()
    expect(result.temp_f).toBe(30)
  })

  it('should have a function "getHistorical"', function() {
    expect(angular.isFunction($service.getHistorical)).toBe(true)
  })

  it('getHistorical should call /historical with the URL parameters for both dates', function() {
    var start = new Date(1391328000000)
    var end = new Date(1391414400000)
    $scope.apply(function(){
      $service.getHistorical({query: query, start: start, end: end}).$promise.then(function(data){
        result = data
      })
    })
    $httpBackend.flush()
    expect(result[0].tempi.values.length).toBe(2)
  })

  it('getHistorical should call /historical with URL param for only 1 day', function(data){
    var start = new Date(1391332000000)
    var end = null
    $scope.$apply(function(){    
      $service.getHistorical({query: query, start: start, end: end}).$promise.then(function(data){
        result = data
      })
    })
    $httpBackend.flush()
    expect(result[0].tempi.values.length).toBe(3)    
  })

})