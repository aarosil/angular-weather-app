/*********************************
/Line Chart Directive
/********************************/

describe('Line Chart Directive', function() {
	beforeEach(module('weatherDirectives'));
	var $scope, elem, directive, compiled, html

	html = '<weather-line-chart label="testLabel" data="testData"></weather-line-chart>'

  beforeEach(function (){
    //load the module
    module('weatherDirectives');
    
    //set our view html.
    //html = '<div sample-one="foo"></div>';
    
    inject(function($compile, $rootScope) {
      //create a scope (you could just use $rootScope, I suppose)
      $scope = $rootScope.$new();
      
      //get the jqLite or jQuery element
      elem = angular.element(html);
      
      //compile the element into a function to 
      // process the view.
      compiled = $compile(elem);
      
      //run the compiled view.
      compiled($scope);
      
      //call digest on the scope!
      $scope.$digest();
    });
  });

	iit('should create an SVG element with its data', function(){
		$scope.testData = {"values":[[1393750560000,"48.9"],[1393754160000,"48.9"],[1393754160000,"48.9"]]}
		$scope.$digest();
		console.log(elem)

	})


})

/*********************************
/Pie Chart Directive
/********************************/
describe('Pie Chart Directive', function(){

	var $scope, elem, compiled, html;

  beforeEach(function (){
    module('weatherDirectives');   
    html = '<weather-pie-chart data="testData"></weather-pie-chart>'; 
    inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      elem = angular.element(html);
      compiled = $compile(elem);
      compiled($scope);
      $scope.$digest();
			$scope.testData = [{status: "Cloudy" , value: 78}, {status: "Clear" , value: 22}]
			$scope.$digest();      
    });
  });	

	it('should create an svg element with its data', function(){
	
	})

	iit('should label the data with its value', function(){
			$scope.testData = [{status: "Cloudy" , value: 78}, {status: "Clear" , value: 22}]
			$scope.$digest();

			console.log(elem) 

			expect(elem.text()).toBe('Cloudy (78%)Clear (22%)')			

	})	


})


/*********************************
/Test Chart Directive
/********************************/
describe('Test Directive', function(){

	var $scope, elem, compiled, html;

  beforeEach(function (){
    module('d3');      
    module('weatherDirectives');    
    html = '<div my-test-directive></div>'; 
    inject(function($compile, $rootScope) {
      $scope = $rootScope;
      elem = angular.element(html);
      compiled = $compile(elem)($scope);
      //$compile(elem)($scope);
      //compiled($scope);
			$scope.$digest();      
    });
  });	

	it('should create an svg element with its data', function(){
	
	})

	iit('should label the data with its value', function(){

			$scope.$digest(); 
			console.log(elem) 

			//expect(elem.text()).toBe('Cloudy (78%)Clear (22%)')			

	})	


})