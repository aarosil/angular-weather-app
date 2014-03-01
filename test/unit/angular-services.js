/*********************************
/ D3 service
/********************************/
describe('D3 Service', function(){

  beforeEach(module('d3'));

	var $service;	

	beforeEach(inject(function($injector) {
		$service = $injector.get('d3Service');
	}))

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
  var GeoLocation, $rootScope, $window;

  beforeEach(inject(function(_GeoLocation_, _$rootScope_, _$window_) {
  	GeoLocation = _GeoLocation_;
    $rootScope = _$rootScope_;
    $window = _$window_;
  }));

  it('returns an object with a getLocation function', function(){
  	expect(angular.isFunction(GeoLocation.getLocation)).toBe(true);
  })

  it('getLocation should obtain user location from the Browser', function(){
    var results;
    spyOn($window.navigator.geolocation,'getCurrentPosition').andCallFake(function(){
      var position = { coords: { latitude: 37, longitude: -122 } };
      arguments[0](position);
    })
    GeoLocation.getLocation().then(function(data){
      results = data;
    })
    $rootScope.$digest();
    expect(results).toEqual({coords: { latitude: 37, longitude: -122 }})
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
    $httpBackend.when('GET', '/weather/37.7749295,-122.4194155').respond({"weather":"Mostly Cloudy","temp_f":30,"temp_c":-1,"relative_humidity":"40%","wind_string":"","dewpoint_string":"14 F (-10 C)"});
    $httpBackend.when('GET', '/history/37.7749295,-122.4194155/1391328000000/1391414400000').respond({"fields":["tempi","hum","pressurei","precipi","fog","rain","snow","conds"],"values":[{"time":1391331360000,"tempi":48.9,"hum":77,"pressurei":30.04,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391334960000,"tempi":48.9,"hum":69,"pressurei":30.04,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391338560000,"tempi":48.9,"hum":61,"pressurei":30.01,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391342160000,"tempi":48,"hum":68,"pressurei":29.98,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391345760000,"tempi":48,"hum":71,"pressurei":29.95,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391349360000,"tempi":48.9,"hum":69,"pressurei":29.93,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391352960000,"tempi":46.9,"hum":83,"pressurei":29.92,"precipi":0.05,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391356560000,"tempi":48,"hum":80,"pressurei":29.9,"precipi":0.09,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391360160000,"tempi":48,"hum":86,"pressurei":29.86,"precipi":0.07,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391363760000,"tempi":48,"hum":83,"pressurei":29.89,"precipi":0.06,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391364840000,"tempi":48.2,"pressurei":29.9,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391365140000,"tempi":48.2,"hum":82,"pressurei":29.9,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1}],"summary":[{"time":1391371200000,"avgdaycloudy":86.1}]})
    $httpBackend.when('GET', '/history/37.7749295,-122.4194155/1391332000000').respond({"fields":["tempi","hum","pressurei","precipi","fog","rain","snow","conds"],"values":[{"time":1391331360000,"tempi":48.9,"hum":77,"pressurei":30.04,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391334960000,"tempi":48.9,"hum":69,"pressurei":30.04,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391338560000,"tempi":48.9,"hum":61,"pressurei":30.01,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391342160000,"tempi":48,"hum":68,"pressurei":29.98,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391345760000,"tempi":48,"hum":71,"pressurei":29.95,"fog":0,"rain":0,"snow":0,"conds":0.75},{"time":1391349360000,"tempi":48.9,"hum":69,"pressurei":29.93,"precipi":0,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391352960000,"tempi":46.9,"hum":83,"pressurei":29.92,"precipi":0.05,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391356560000,"tempi":48,"hum":80,"pressurei":29.9,"precipi":0.09,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391360160000,"tempi":48,"hum":86,"pressurei":29.86,"precipi":0.07,"fog":0,"rain":1,"snow":0,"conds":1},{"time":1391363760000,"tempi":48,"hum":83,"pressurei":29.89,"precipi":0.06,"fog":0,"rain":1,"snow":0,"conds":1}],"summary":[{"time":1391371200000,"avgdaycloudy":86.1}]})
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
    $scope.$apply(function(){
      $service.getHistorical({query: query, startDate: start.getTime(), endDate: end.getTime()}).$promise.then(function(data){
        result = data
      })
    })
    $httpBackend.flush()
    expect(result.values.length).toBe(12)
  })

  it('getHistorical should call /historical with the URL parameters for one date', function() {
    var start = new Date(1391332000000)
    var end = null
    $scope.$apply(function(){
      $service.getHistorical({query: query, startDate: start.getTime(), endDate: end}).$promise.then(function(data){
        result = data
      })
    })
    $httpBackend.flush()
    expect(result.values.length).toBe(10)
  })

})