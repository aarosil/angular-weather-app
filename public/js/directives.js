var weatherDirectives = angular.module('weatherDirectives', ['d3']);

weatherDirectives.directive('weatherLineChart', ['d3Service', '$window', 
	function(d3Service, $window) {
		return {
			restrict: 'EA', 
			scope: {
				data: '='
			},
			link: function(scope, ele, attrs) {
				d3Service.d3().then(function(d3) {
					
					var svg = d3.select(ele[0]).append('svg:svg')
						//.style('width', '100%');

					window.onresize = function() {
						scope.$apply();
					}

					
					scope.$watch(function(){
						return angular.element($window)[0].innerWidth;
					}, function() {
						scope.processData(scope.data);
					});
		
					scope.$watch('data', function(newVals, oldVals) {
					  return scope.processData(newVals);
					}, true);					

					scope.processData = function(data){
						if (typeof data !== 'undefined') {
							if (typeof data.values !== 'undefined') {
								var data = window._.map(data.values, (function(item){return {"x": item[0], "y":item[1]}}))
								scope.render(data)	
							} 
						}
					}

					scope.render = function(data) {
						svg.selectAll('*').remove();
						
						if(!data) return;						
						
						var elemWidth = svg.node().offsetWidth;
						var margin = {top: 20, right: 20, bottom: 30, left: 50},
						    width =  parseInt(elemWidth,10) - margin.left - margin.right,
						    height = 200 - margin.top - margin.bottom;
						

						var x = d3.time.scale()
						    .range([0, width]);

						var y = d3.scale.linear()
						    .domain([d3.min(data, function(d){return d.y}),d3.max(data, function(d){return d.y})])
						    .rangeRound([height, 0]);
						    

						var xAxis = d3.svg.axis()
						    .scale(x)
						    .orient("bottom");

						 var yAxis = d3.svg.axis()
						 	.scale(y)
						 	.ticks(4)
						 	.orient("left");

						var line = d3.svg.line()
						    .x(function(d) { return x(d.x); })
						    .y(function(d) { return y(d.y); });

						svg.attr("width", parseInt(width) + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom)
							.append("g")
							.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


						x.domain(d3.extent(data, function(d) { return d.x; }));
						y.domain(d3.extent(data, function(d) { return d.y; }));

						svg.append("g")
							.attr("class", "x axis")
							.attr("transform", "translate(0," + parseInt(height,10) + ")")
							.call(xAxis);

						svg.append("g")
							.attr("class", "y axis")
							.attr("transform", "translate(" + parseInt(width,10) + ",0)")
							.call(yAxis)
							.append("text")
							.attr("transform", "rotate(-90)")
							.attr("y", 6)
							.attr("dy", ".71em")
							.style("text-anchor", "end")
							.text(attrs.label);;						

						svg.append("path")
							.datum(data)
							.attr("class", "line")
							.attr("d", line);

					}

				})
			}
		}
	}]);

weatherDirectives.directive('weatherPieChart', ['d3Service', '$window', 
	function(d3Service, $window) {
		return {
			restrict: 'EA', 
			scope: {
				data: '='
			},
			link: function(scope, ele, attrs) {
				d3Service.d3().then(function(d3) {
					
					var svg = d3.select(ele[0])
						.append('svg:svg')
						.style('width', '100%');

					window.onresize = function() {
						scope.$apply();
					}
					
					scope.$watch(function(){
						return angular.element($window)[0].innerWidth;
					}, function() {
						scope.render(scope.data);
					});
		
					scope.$watch('data', function(newVals, oldVals) {
					  return scope.render(newVals);
					}, true);	

					scope.render = function(data) {
						
						svg.selectAll('*').remove();

						if(!data) return;						

						//data = [ 
						//data is the % cloudy daylight hours 
						//	{status: "Cloudy" , value: 100 * data},
						//	{status: "Clear" , value: 100 * (1-data)}
						//];

						var elemWidth = svg.node().offsetWidth;
						//var elemWidth = 700
						//console.log(d3.select(ele[0]).node())
						//console.log('elemWidth: ' + elemWidth)
						var width =  elemWidth;
						var height = 200 ;					
						var radius = Math.min(width, height) / 2;

						var color = d3.scale.ordinal()
							.range(["#98abc5", "#8a89a6"]);

						var arc = d3.svg.arc()
							.outerRadius(radius - 10)
							.innerRadius(0);

						var pie = d3.layout.pie()
							.sort(null)
							.value(function(d) { return d.value; });

						console.log('new width: ' + width + ' height: ' + height )
						
						svg.attr("width", parseInt(width, 10))
							.attr("height", height)

						var chart = svg.append("g")
							.attr("transform", "translate(" + width/2 + "," + height/2 + ")");

						var g = chart.selectAll(".arc")
							.data(pie(data))
							.enter().append("g")
							.attr("class", "arc");

						g.append("path")
							.attr("d", arc)
							.style("fill", function(d) { return color(d.data.status); });

						g.append("text")
							.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
							.attr("dy", ".35em")
							.style("text-anchor", "middle")
							.text(function(d) { return d.data.status; });

					}					

				})
			}
		}
	}]);