/*********************************
/D3 Graph Directives
/********************************/
describe('d3 Directives', function(){
	// reuse variables in all tests
	var $compile, $rootScope, $window, mockd3Service, $q, html, element, data;
	// Recompile with new data/directive
	function compileElement(html, data) {
		var e = angular.element(html)
		e = $compile(html)($rootScope)		
		$rootScope.testData = data
		$rootScope.$digest();
		element = e
	}
	// setup testbed and inject mock 
	// d3Service to load d3.v3.js script
	beforeEach(function(){
		mockd3Service = {}
		module('weatherDirectives')

		module(function($provide){
			$provide.value('d3Service', mockd3Service)
		})

		inject(function(_$compile_, _$rootScope_, _$window_, _$q_) {
			$window = _$window_;
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$q = _$q_
		});

		mockd3Service.d3 = function() {
			var deferred = $q.defer();
			deferred.resolve($window.d3)
			return deferred.promise;
		}

	});

/*********************************
/weatherPieChart Directive
/********************************/
	it('weatherPieChart creates svg element and 3 arc segments', function(){
		html = '<weather-pie-chart data="testData"></weather-pie-chart>'
		data = [{status: "Cloudy" , value: 78}, {status: "Clear" , value: 22}]
		compileElement(html,data)
		expect(element.find('svg').length).toBe(1)
		expect(element.find('g').length).toBe(3)
	})

	it('weatherPieCharts labels the data with its proper value', function(){
		html = '<weather-pie-chart data="testData"></weather-pie-chart>'
		data = [{status: "Cloudy" , value: 18}, {status: "Clear" , value: 82}]
		compileElement(html,data)
		expect(element.text()).toBe('Cloudy (18%)Clear (82%)')			
	})	

/*********************************
/weatherLineChart Directive
/********************************/
	it('weatherLineChart creates an svg element with line and path elements', function(){
		html = '<weather-line-chart data="testData" key="y" label="testLabel"></weather-line-chart>'
		data = [{"time": 1393750560000, "y":48.9},{ "time":1393754160000, "y": 48.9},{"time": 1393754160000, "y":48.9}]
		compileElement(html,data);
		expect(element.find('path').length).toBe(3);
		expect(element.find('line').length).toBe(12);
	})

})
