var weatherDirectives = angular.module('weatherDirectives', ['d3']);

weatherDirectives.directive('weatherLineChart', ['d3Service', '$window', 
	function(d3Service, $window) {
		return {
			restrict: 'EA', 
			scope: {
				data: '=',  // data format is {time: time, field1: val1, field2, val2, ...},
				key: '=', 	// so 'key' attr on chart tells what key to graph
				label: '='	// so label is the human-reabable name for the key
			},
			link: function(scope, ele, attrs) {
				d3Service.d3().then(function(d3) {
					
					var svg = d3.select(ele[0])
						.append('svg:svg')
						.style('width', '100%');

					$window.onresize = function() {
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
						var key = scope.key
						if(!data) return;						
						
						var elemWidth = ele[0].offsetWidth;
						var	margin = {top: 20, right: 30, bottom: 20, left: 30};
						var width = elemWidth - margin.left - margin.right;
						var height = (.38 * width) - margin.top - margin.bottom;
						var format = d3.time.format('%b %_d')

						svg.attr("height", height + margin.top + margin.bottom)
							.attr("width", width )

						var y = d3.scale.linear().rangeRound([height,0]);
						var x = d3.time.scale().range([0,width])	

						x.domain(d3.extent(data, function(d) { return d.time; }));
						var minY = d3.min(data, function(d){return d[key]})
						var maxY = d3.max(data, function(d){return d[key]})
						y.domain([minY - (0.075*minY), maxY + (maxY*0.075)]);

						 var yAxis = d3.svg.axis()
						 	.scale(y)
							.orient('left')
							.tickSize(-width, 0, 0)

						reportNumDays = Math.round( (x.domain()[1].getTime() - x.domain()[0].getTime() )/(1000*60*60*24) );
						var barWidth =  width/reportNumDays;

						svg.append('g')
							.attr('transform', 'translate(' + margin.left +','+margin.top + ')')
							.attr('class', 'y-axis')
							.call(yAxis)	
						
						var days = svg.append('g')
							.attr('transform', 'translate(' + margin.left +','+margin.top + ')')
							.attr('class', 'y-axis')		
							
						var dayLines = days.selectAll('g')
						    .data(d3.range(reportNumDays))
						 	.enter().append('g')	

						dayLines.append('rect')
						    .attr('y', function(d) {return 0; })
						    .attr('x', function(d, i) { return (i * barWidth) + barWidth; })
						    .attr('width', 1)
						    .attr('height', function(d) {return height; })
						    .attr('stroke', 'none')					 				
						    .attr('fill', '#CCC')		

						dayLines.append('text')
							.attr('y', height + margin.bottom)
							.attr('x', function(d, i) { return (i * barWidth) + barWidth/2; })
							.attr('font-size', '11px')
							.attr('fill', 'black')		
							.style("text-anchor", "middle")					
							.text(function(d,i) {
								var next = x.domain()[0].getTime() + ((i)*(1000*60*60*24))
								return format(   new   Date(  x.domain()[0].getTime() + ((i)*(1000*60*60*24))  )   )
							}) 						    					

						var line = d3.svg.line()
						    .x(function(d) { return x(d.time); })
						    .y(function(d) { return y(d[key]); });

						var g = svg.append("g")
							.attr('transform', 'translate(' + margin.left +','+margin.top + ')')					

						g.append("path")
							.datum(data)
							.attr("class", "line")
							.attr("d", line)

					}

				})
			}
		}
	}]);

weatherDirectives.directive('weatherBarChart', ['d3Service', '$window', 
	function(d3Service, $window){
		return {

			restrict: 'EA', 
			scope: {
				data: '=',  // data format is {time: time, field1: val1, field2, val2, ...},
				key: '=', 	// so 'key' attr on chart tells what key to graph
				label: '='	// so label is the human-reabable name for the key
			},
			link: function(scope, ele, attrs) {
				d3Service.d3().then(function(d3) {
					
					var svg = d3.select(ele[0])
						.append('svg:svg')
						.style('width', '100%')
						.classed('barChart', true);						

					$window.onresize = function() {
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

						var key = scope.key
						svg.selectAll('*').remove();

						if(!data) return;	

						//var width = svg.node().offsetWidth||450;
						var elemWidth = ele[0].offsetWidth;
						var	margin = {top: 20, right: 20, bottom: 20, left: 20};
						var width = elemWidth - margin.left - margin.right;
						var barPadding = 2
						var barWidth =  width/data.length;
						var height = (.38 * width) - margin.top - margin.bottom;
						var format = d3.time.format('%b %_d')
						
						var minBarHeight = (.025 * height);

						svg.attr("height", height + margin.top + margin.bottom)
						svg.attr("width", elemWidth )

						var y = d3.scale.linear().range([height,0]);
						var x = d3.time.scale().range([0,width])				
						y.domain([d3.min(data, function(d){return d[key]})-minBarHeight/2,d3.max(data, function(d){return d[key]})+minBarHeight/2]);
						x.domain(d3.extent(data, function(d) { return d.time; }));
									
						var yAxis = d3.svg.axis()
							.scale(y)
							.orient('left')
							.tickSize(-width, 0, 0)
							//.tickFormat('')

						svg.append('g')
							.attr('transform', 'translate(' + margin.left +','+margin.top + ')')
							.attr('class', 'y-axis')
							.call(yAxis)						

						var g = svg.append('g')
							.attr('transform', 'translate(' + margin.left +','+margin.top + ')');

						var bar = g.selectAll('g')
						    .data(data)
						 	.enter().append('g')

						bar.append('rect')
						    .attr('y', function(d) {return y(d[key]); })
						    .attr('x', function(d, i) { return i * barWidth + barPadding; })
						    .attr('width', barWidth - barPadding)
						    .attr('height', function(d) {return height - y(d[key]); });

						bar.append("text")
						    .attr("y", function(d) { return y(d[key])-margin.top/2; })
						    .attr("x", function(d, i) { return (i * barWidth)+barWidth/2; })
						    .attr("dy", ".35em")
						    .text(function(d) { return d3.round(d[key],1); });
						
						bar.append('text')
							.attr('y', height + margin.bottom)
							.attr('x', function(d, i) { return (i * barWidth)+barWidth/2; })
							.attr('font-size', '11px')
							.attr('fill', 'black')							
							.text(function(d) {return format(new Date(d.time))}) 

					}
				})

			}

		}
	}
]);

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
						.style('width', '100%')

					$window.onresize = function() {
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

						var elemWidth = ele[0].offsetWidth;
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
							.text(function(d) { return d.data.status + " (" + d3.round(d.data.value,1) + "%)"; });

					}					

				})
			}
		}
	}]);

weatherDirectives.directive('weatherSpinnerGif', ['$q', '$timeout', '$window', 'weatherHttpInterceptor',
	function($q, $timeout, $window, weatherHttpInterceptor){
		return {
			restrict: 'EA', 
			transclude: true, 
			scope: {
				delay: '@'
			},
            template: '<div id="overlay-container" class="overlayContainer">' +
                            '<div id="overlay-background" class="overlayBackground"></div>' +
                            '<div id="overlay-content" class="overlayContent" data-ng-transclude>' +
                            '</div>' +
                        '</div>',

			link: function (scope, ele, attrs) {

				var overlayContainer = null;
				var timerPromise = null;
				var timerPromiseHide = null;
				var inSession = false;
				var queue = [];

				overlayContainer = document.getElementById('overlay-container');

				weatherHttpInterceptor.request = function(config) {
					if (RegExp('\^/weather|\^/history').test(config.url)) processRequest();
					return config || $q.when(config);
				}

				weatherHttpInterceptor.requestError = function(rejection){
					processRequest();
					return $q.reject(rejection);
				}
				weatherHttpInterceptor.response = function (response) {
					if (RegExp('\^/weather|\^/history').test(response.config.url)) processResponse();
					return response || $q.when(response);
				},
				weatherHttpInterceptor.responseError = function(rejection){
					processResponse();
					return $q.reject(rejection)
				}


				function processRequest() {
					queue.push({});
					if (queue.length == 1) {
						timerPromise = $timeout(function () {
							if (queue.length) showOverlay();
						}, scope.delay ? scope.delay : 500); //Delay showing to avoid flicker
					}
				}

				function processResponse() {
					queue.pop();
					if (queue.length == 0) {
						timerPromiseHide = $timeout(function () {
							if (queue.length == 0) {
								hideOverlay();
								if (timerPromiseHide) $timeout.cancel(timerPromiseHide);
							}
						}, scope.delay ? scope.delay : 500);
					}
				}

				function showOverlay() {
                    var w = 0;
                    var h = 0;
                    if (!$window.innerWidth) {
                        if (!(document.documentElement.clientWidth == 0)) {
                            w = document.documentElement.clientWidth;
                            h = document.documentElement.clientHeight;
                        }
                        else {
                            w = document.body.clientWidth;
                            h = document.body.clientHeight;
                        }
                    }
                    else {
                        w = $window.innerWidth;
                        h = $window.innerHeight;
                    }
                    var content = document.getElementById('overlay-content');
                    var contentWidth = parseInt(getComputedStyle(content, 'width').replace('px', ''));
                    var contentHeight = parseInt(getComputedStyle(content, 'height').replace('px', ''));

                    content.style.top = h / 2 - contentHeight / 2 + 'px';
                    content.style.left = w / 2 - contentWidth / 2 + 'px'


					overlayContainer.style.display = 'block';
				}

				function hideOverlay() {
					if (timerPromise) $timeout.cancel(timerPromise);
					overlayContainer.style.display = 'none';
				}

                var getComputedStyle = function () {
                    var func = null;
                    if (document.defaultView && document.defaultView.getComputedStyle) {
                        func = document.defaultView.getComputedStyle;
                    } else if (typeof (document.body.currentStyle) !== "undefined") {
                        func = function (element, anything) {
                            return element["currentStyle"];
                        };
                    }

                    return function (element, style) {
                        return func(element, null)[style];
                    }
                }();

			}
		}	

	}])