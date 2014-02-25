describe('Controllers', function(){
  beforeEach(module('weatherControllers'));
  beforeEach(module('weatherServices'));
  beforeEach(module('weatherDirectives'));
  beforeEach(module('ui.bootstrap'));
  beforeEach(module('d3'));

  var $scope, $location, $rootScope, $controller;

  beforeEach(inject(function($injector) {
    $location = $injector.get('$location');
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $controller = $injector.get('$controller');
  }));

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
  var date = new Date()
  var yesterday = new Date(date.getDate()-1)

  it('WeatherCtrl verifies the start date entered is not more than 1 day ago', function() {
    controller = $controller('WeatherCtrl', {'$scope': $scope});
    expect(controller).toBeDefined();
    $scope.formData.historyStart = date
    $scope.validateDateRange()
    expect($scope.formData.dateValidationMessage).not.toEqual(null)
    $scope.formData.historyStart = yesterday
    $scope.validateDateRange()
    expect($scope.formData.dateValidationMessage).toEqual(null)
  })

});