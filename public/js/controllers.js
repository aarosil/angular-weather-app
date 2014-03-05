var weatherControllers = angular.module('weatherControllers', ['weatherDirectives']);

weatherControllers.controller('HomeCtrl', ['$scope',
	function($scope){
		//todo: replace with smaller data
		$scope.weatherData = {"observations":[{"time":1392970260000,"tempi":35.6,"hum":93,"precipi":0,"conds":1,"dewpti":33.8,"wspdi":5.8,"pressurei":30.03},{"time":1392972960000,"tempi":36,"hum":97,"precipi":0,"conds":1,"dewpti":35.1,"wspdi":8.1,"pressurei":30.03},{"time":1392974640000,"tempi":35.6,"hum":100,"precipi":0,"conds":1,"dewpti":35.6,"wspdi":8.1,"pressurei":29.99},{"time":1392976560000,"tempi":36,"hum":100,"precipi":0,"conds":1,"dewpti":36,"wspdi":5.8,"pressurei":30},{"time":1392978240000,"tempi":37.4,"hum":93,"precipi":0,"conds":1,"dewpti":35.6,"wspdi":6.9,"pressurei":29.97},{"time":1392980160000,"tempi":37,"hum":96,"precipi":0,"conds":1,"dewpti":36,"wspdi":8.1,"pressurei":29.98},{"time":1392983760000,"tempi":36,"hum":97,"precipi":0,"conds":1,"dewpti":35.1,"wspdi":10.4,"pressurei":29.96},{"time":1392985320000,"tempi":35.6,"hum":100,"precipi":0,"conds":1,"dewpti":35.6,"wspdi":9.2,"pressurei":29.95},{"time":1392986220000,"tempi":35.6,"hum":100,"precipi":0,"conds":1,"dewpti":35.6,"wspdi":10.4,"pressurei":29.95},{"time":1392987360000,"tempi":36,"hum":97,"precipi":0,"conds":1,"dewpti":35.1,"wspdi":8.1,"pressurei":29.97},{"time":1392990960000,"tempi":35.1,"hum":100,"precipi":0,"conds":1,"dewpti":35.1,"wspdi":6.9,"pressurei":29.97},{"time":1392994560000,"tempi":36,"hum":97,"precipi":0,"conds":1,"dewpti":35.1,"wspdi":9.2,"pressurei":29.96},{"time":1392998160000,"tempi":36,"hum":97,"precipi":0,"conds":1,"dewpti":35.1,"wspdi":13.8,"pressurei":29.95},{"time":1393001760000,"tempi":36,"hum":97,"precipi":0,"conds":1,"dewpti":35.1,"wspdi":8.1,"pressurei":29.94},{"time":1393005360000,"tempi":36,"hum":97,"precipi":0.01,"conds":1,"dewpti":35.1,"wspdi":12.7,"pressurei":29.91},{"time":1393008960000,"tempi":37,"hum":96,"precipi":0,"conds":1,"dewpti":36,"wspdi":6.9,"pressurei":29.9},{"time":1393011300000,"tempi":37.4,"hum":93,"precipi":0,"conds":1,"dewpti":35.6,"wspdi":6.9,"pressurei":29.84},{"time":1393012560000,"tempi":37,"hum":100,"precipi":0,"conds":1,"dewpti":37,"wspdi":8.1,"pressurei":29.84},{"time":1393016160000,"tempi":39,"hum":96,"precipi":0.01,"conds":1,"dewpti":37.9,"wspdi":9.2,"pressurei":29.77},{"time":1393016580000,"tempi":39.2,"hum":93,"precipi":0,"conds":1,"dewpti":37.4,"wspdi":8.1,"pressurei":29.74},{"time":1393019760000,"tempi":39.9,"hum":97,"precipi":0,"conds":1,"dewpti":39,"wspdi":6.9,"pressurei":29.73},{"time":1393023360000,"tempi":39,"hum":100,"precipi":0,"conds":1,"dewpti":39,"wspdi":8.1,"pressurei":29.7},{"time":1393026480000,"tempi":41,"hum":100,"precipi":0.04,"conds":1,"dewpti":41,"wspdi":4.6,"pressurei":29.66},{"time":1393026960000,"tempi":42.1,"hum":92,"precipi":0.06,"conds":1,"dewpti":39.9,"wspdi":6.9,"pressurei":29.67},{"time":1393027320000,"tempi":42.8,"hum":93,"precipi":0.01,"conds":1,"dewpti":41,"wspdi":5.8,"pressurei":29.64},{"time":1393028100000,"tempi":42.8,"hum":93,"precipi":0.01,"conds":1,"dewpti":41,"wspdi":17.3,"pressurei":29.7},{"time":1393028700000,"tempi":39.2,"hum":100,"precipi":0.01,"conds":1,"dewpti":39.2,"wspdi":9.2,"pressurei":29.7},{"time":1393030500000,"tempi":41,"hum":93,"precipi":0,"conds":0.75,"dewpti":39.2,"wspdi":11.5,"pressurei":29.73},{"time":1393030560000,"tempi":41,"hum":96,"precipi":0.01,"conds":0.75,"dewpti":39.9,"wspdi":12.7,"pressurei":29.73},{"time":1393031160000,"tempi":42.8,"hum":93,"precipi":0,"conds":0.75,"dewpti":41,"wspdi":12.7,"pressurei":29.71},{"time":1393034160000,"tempi":44.1,"hum":89,"precipi":0,"conds":1,"dewpti":41,"wspdi":6.9,"pressurei":29.75},{"time":1393037760000,"tempi":45,"hum":80,"precipi":0,"conds":0.75,"dewpti":39,"wspdi":5.8,"pressurei":29.79},{"time":1393041360000,"tempi":43,"hum":76,"precipi":0,"conds":0.25,"dewpti":36,"wspdi":6.9,"pressurei":29.81},{"time":1393044960000,"tempi":42.1,"hum":73,"precipi":0,"conds":0,"dewpti":34,"wspdi":6.9,"pressurei":29.83},{"time":1393048560000,"tempi":39.9,"hum":77,"precipi":0,"conds":0,"dewpti":33.1,"wspdi":5.8,"pressurei":29.87},{"time":1393052160000,"tempi":37,"hum":82,"precipi":0,"conds":0,"dewpti":32,"wspdi":0,"pressurei":29.89},{"time":1393055760000,"tempi":37,"hum":82,"precipi":0,"conds":0,"dewpti":32,"wspdi":0,"pressurei":29.92},{"time":1393059360000,"tempi":36,"hum":86,"precipi":0,"conds":0,"dewpti":32,"wspdi":0,"pressurei":29.93},{"time":1393062960000,"tempi":36,"hum":79,"precipi":0,"conds":0,"dewpti":30,"wspdi":0,"pressurei":29.94},{"time":1393066560000,"tempi":36,"hum":82,"precipi":0,"conds":0,"dewpti":30.9,"wspdi":3.5,"pressurei":29.94},{"time":1393070160000,"tempi":34,"hum":85,"precipi":0,"conds":0,"dewpti":30,"wspdi":0,"pressurei":29.95},{"time":1393073760000,"tempi":34,"hum":85,"precipi":0,"conds":0,"dewpti":30,"wspdi":0,"pressurei":29.98},{"time":1393077360000,"tempi":34,"hum":85,"precipi":0,"conds":0,"dewpti":30,"wspdi":4.6,"pressurei":30},{"time":1393080960000,"tempi":35.1,"hum":76,"precipi":0,"conds":0,"dewpti":28,"wspdi":3.5,"pressurei":30.01},{"time":1393084560000,"tempi":36,"hum":67,"precipi":0,"conds":0,"dewpti":26.1,"wspdi":0,"pressurei":30.03},{"time":1393088160000,"tempi":39,"hum":57,"precipi":0,"conds":0,"dewpti":25,"wspdi":3.5,"pressurei":30.04},{"time":1393091760000,"tempi":43,"hum":42,"precipi":0,"conds":0,"dewpti":21,"wspdi":5.8,"pressurei":30.03},{"time":1393095360000,"tempi":46,"hum":31,"precipi":0,"conds":0,"dewpti":17.1,"wspdi":8.1,"pressurei":30.02},{"time":1393098960000,"tempi":46,"hum":34,"precipi":0,"conds":0,"dewpti":19,"wspdi":10.4,"pressurei":30},{"time":1393102560000,"tempi":48.9,"hum":29,"precipi":0,"conds":0,"dewpti":18,"wspdi":9.2,"pressurei":29.97},{"time":1393106160000,"tempi":50,"hum":29,"precipi":0,"conds":0,"dewpti":19,"wspdi":5.8,"pressurei":29.94},{"time":1393109760000,"tempi":51.1,"hum":27,"precipi":0,"conds":0,"dewpti":18,"wspdi":12.7,"pressurei":29.94},{"time":1393113360000,"tempi":52,"hum":25,"precipi":0,"conds":0,"dewpti":17.1,"wspdi":10.4,"pressurei":29.94},{"time":1393116960000,"tempi":51.1,"hum":26,"precipi":0,"conds":0,"dewpti":17.1,"wspdi":11.5,"pressurei":29.95},{"time":1393120560000,"tempi":48.9,"hum":29,"precipi":0,"conds":0,"dewpti":18,"wspdi":4.6,"pressurei":29.96},{"time":1393124160000,"tempi":48,"hum":32,"precipi":0,"conds":0,"dewpti":19,"wspdi":3.5,"pressurei":29.98},{"time":1393127760000,"tempi":48,"hum":33,"precipi":0,"conds":0,"dewpti":19.9,"wspdi":3.5,"pressurei":29.99},{"time":1393131360000,"tempi":46.9,"hum":34,"precipi":0,"conds":0,"dewpti":19.9,"wspdi":4.6,"pressurei":30.01},{"time":1393134960000,"tempi":46,"hum":35,"precipi":0,"conds":0,"dewpti":19.9,"wspdi":0,"pressurei":30.01},{"time":1393138560000,"tempi":45,"hum":42,"precipi":0,"conds":0,"dewpti":23,"wspdi":0,"pressurei":30.01},{"time":1393142160000,"tempi":45,"hum":48,"precipi":0,"conds":0,"dewpti":26.1,"wspdi":6.9,"pressurei":30.01},{"time":1393145760000,"tempi":44.1,"hum":49,"precipi":0,"conds":0,"dewpti":26.1,"wspdi":3.5,"pressurei":30},{"time":1393149360000,"tempi":41,"hum":57,"precipi":0,"conds":0,"dewpti":27,"wspdi":0,"pressurei":30},{"time":1393152960000,"tempi":43,"hum":56,"precipi":0,"conds":0,"dewpti":28,"wspdi":3.5,"pressurei":29.99},{"time":1393156560000,"tempi":39,"hum":65,"precipi":0,"conds":0,"dewpti":28,"wspdi":0,"pressurei":29.99},{"time":1393160160000,"tempi":35.1,"hum":76,"precipi":0,"conds":0,"dewpti":28,"wspdi":0,"pressurei":30},{"time":1393163760000,"tempi":34,"hum":75,"precipi":0,"conds":0,"dewpti":27,"wspdi":6.9,"pressurei":30},{"time":1393167360000,"tempi":33.1,"hum":78,"precipi":0,"conds":0.25,"dewpti":27,"wspdi":0,"pressurei":30.01},{"time":1393170960000,"tempi":37.9,"hum":70,"precipi":0,"conds":0.5,"dewpti":28.9,"wspdi":5.8,"pressurei":30.01},{"time":1393174560000,"tempi":42.1,"hum":53,"precipi":0,"conds":0,"dewpti":26.1,"wspdi":6.9,"pressurei":30},{"time":1393178160000,"tempi":44.1,"hum":47,"precipi":0,"conds":0,"dewpti":25,"wspdi":8.1,"pressurei":30},{"time":1393181760000,"tempi":46,"hum":44,"precipi":0,"conds":0,"dewpti":25,"wspdi":4.6,"pressurei":29.98},{"time":1393185360000,"tempi":46.9,"hum":42,"precipi":0,"conds":0.25,"dewpti":25,"wspdi":8.1,"pressurei":29.96},{"time":1393188960000,"tempi":48,"hum":39,"precipi":0,"conds":0,"dewpti":24.1,"wspdi":8.1,"pressurei":29.91},{"time":1393192560000,"tempi":48,"hum":41,"precipi":0,"conds":0.25,"dewpti":25,"wspdi":8.1,"pressurei":29.9},{"time":1393196160000,"tempi":48,"hum":39,"precipi":0,"conds":0.25,"dewpti":24.1,"wspdi":5.8,"pressurei":29.89},{"time":1393199760000,"tempi":50,"hum":36,"precipi":0,"conds":0.75,"dewpti":24.1,"wspdi":0,"pressurei":29.88},{"time":1393203360000,"tempi":48.9,"hum":38,"precipi":0,"conds":0.75,"dewpti":24.1,"wspdi":0,"pressurei":29.87},{"time":1393206960000,"tempi":45,"hum":46,"precipi":0,"conds":0.25,"dewpti":25,"wspdi":0,"pressurei":29.86},{"time":1393210560000,"tempi":42.1,"hum":55,"precipi":0,"conds":0.25,"dewpti":27,"wspdi":0,"pressurei":29.87},{"time":1393214160000,"tempi":46,"hum":44,"precipi":0,"conds":1,"dewpti":25,"wspdi":3.5,"pressurei":29.86},{"time":1393217760000,"tempi":46,"hum":46,"precipi":0,"conds":1,"dewpti":26.1,"wspdi":6.9,"pressurei":29.84},{"time":1393221360000,"tempi":44.1,"hum":49,"precipi":0,"conds":1,"dewpti":26.1,"wspdi":5.8,"pressurei":29.84},{"time":1393224960000,"tempi":44.1,"hum":47,"precipi":0,"conds":1,"dewpti":25,"wspdi":6.9,"pressurei":29.83},{"time":1393228560000,"tempi":43,"hum":49,"precipi":0,"conds":1,"dewpti":25,"wspdi":9.2,"pressurei":29.83},{"time":1393232160000,"tempi":43,"hum":49,"precipi":0,"conds":1,"dewpti":25,"wspdi":3.5,"pressurei":29.81},{"time":1393235760000,"tempi":41,"hum":55,"precipi":0,"conds":1,"dewpti":26.1,"wspdi":0,"pressurei":29.8},{"time":1393239360000,"tempi":39,"hum":60,"precipi":0,"conds":0.25,"dewpti":26.1,"wspdi":5.8,"pressurei":29.79},{"time":1393242960000,"tempi":39,"hum":49,"precipi":0,"conds":0.5,"dewpti":21,"wspdi":9.2,"pressurei":29.81},{"time":1393246560000,"tempi":37.9,"hum":43,"precipi":0,"conds":0,"dewpti":17.1,"wspdi":8.1,"pressurei":29.83},{"time":1393250160000,"tempi":35.1,"hum":40,"precipi":0,"conds":0,"dewpti":12.9,"wspdi":10.4,"pressurei":29.84},{"time":1393253760000,"tempi":32,"hum":45,"precipi":0,"conds":0,"dewpti":12.9,"wspdi":13.8,"pressurei":29.86},{"time":1393257360000,"tempi":30.9,"hum":46,"precipi":0,"conds":0.5,"dewpti":12,"wspdi":15,"pressurei":29.88},{"time":1393260960000,"tempi":30.9,"hum":43,"precipi":0,"conds":0,"dewpti":10.9,"wspdi":17.3,"pressurei":29.89},{"time":1393264560000,"tempi":32,"hum":42,"precipi":0,"conds":0,"dewpti":10.9,"wspdi":16.1,"pressurei":29.89},{"time":1393268160000,"tempi":32,"hum":40,"precipi":0,"conds":0.5,"dewpti":10,"wspdi":21.9,"pressurei":29.89},{"time":1393271760000,"tempi":32,"hum":38,"precipi":0,"conds":0.5,"dewpti":9,"wspdi":18.4,"pressurei":29.89},{"time":1393275360000,"tempi":32,"hum":37,"precipi":0,"conds":0.25,"dewpti":8.1,"wspdi":23,"pressurei":29.87},{"time":1393278960000,"tempi":32,"hum":37,"precipi":0,"conds":0.25,"dewpti":8.1,"wspdi":18.4,"pressurei":29.86},{"time":1393282560000,"tempi":32,"hum":38,"precipi":0,"conds":0.25,"dewpti":9,"wspdi":16.1,"pressurei":29.88},{"time":1393286160000,"tempi":30.9,"hum":38,"precipi":0,"conds":0.75,"dewpti":8.1,"wspdi":23,"pressurei":29.89},{"time":1393289760000,"tempi":30.9,"hum":40,"precipi":0,"conds":0.75,"dewpti":9,"wspdi":20.7,"pressurei":29.92},{"time":1393293360000,"tempi":28.9,"hum":47,"precipi":0,"conds":0.5,"dewpti":10.9,"wspdi":18.4,"pressurei":29.95},{"time":1393296960000,"tempi":28,"hum":47,"precipi":0,"conds":0.5,"dewpti":10,"wspdi":15,"pressurei":29.98},{"time":1393300560000,"tempi":27,"hum":53,"precipi":0,"conds":0.25,"dewpti":12,"wspdi":18.4,"pressurei":30.03},{"time":1393304160000,"tempi":26.1,"hum":47,"precipi":0,"conds":0.5,"dewpti":8.1,"wspdi":20.7,"pressurei":30.06},{"time":1393307760000,"tempi":24.1,"hum":46,"precipi":0,"conds":0,"dewpti":6.1,"wspdi":16.1,"pressurei":30.06},{"time":1393311360000,"tempi":24.1,"hum":46,"precipi":0,"conds":0,"dewpti":6.1,"wspdi":15,"pressurei":30.06},{"time":1393314960000,"tempi":23,"hum":46,"precipi":0,"conds":0,"dewpti":5,"wspdi":13.8,"pressurei":30.07},{"time":1393318560000,"tempi":23,"hum":46,"precipi":0,"conds":0,"dewpti":5,"wspdi":18.4,"pressurei":30.07},{"time":1393322160000,"tempi":21.9,"hum":51,"precipi":0,"conds":0,"dewpti":6.1,"wspdi":9.2,"pressurei":30.06},{"time":1393325760000,"tempi":21.9,"hum":51,"precipi":0,"conds":0.5,"dewpti":6.1,"wspdi":10.4,"pressurei":30.06},{"time":1393329360000,"tempi":21,"hum":50,"precipi":0,"conds":0,"dewpti":5,"wspdi":6.9,"pressurei":30.06},{"time":1393332960000,"tempi":19.9,"hum":52,"precipi":0,"conds":0,"dewpti":5,"wspdi":8.1,"pressurei":30.06},{"time":1393336560000,"tempi":19.9,"hum":55,"precipi":0,"conds":0,"dewpti":6.1,"wspdi":6.9,"pressurei":30.06},{"time":1393340160000,"tempi":19.9,"hum":55,"precipi":0,"conds":0,"dewpti":6.1,"wspdi":4.6,"pressurei":30.06},{"time":1393343760000,"tempi":21.9,"hum":51,"precipi":0,"conds":0.75,"dewpti":6.1,"wspdi":3.5,"pressurei":30.06},{"time":1393347360000,"tempi":21.9,"hum":53,"precipi":0,"conds":1,"dewpti":7,"wspdi":8.1,"pressurei":30.06},{"time":1393350960000,"tempi":23,"hum":60,"precipi":0,"conds":1,"dewpti":10.9,"wspdi":9.2,"pressurei":30.05},{"time":1393354560000,"tempi":24.1,"hum":62,"precipi":0,"conds":0.25,"dewpti":12.9,"wspdi":8.1,"pressurei":30.04},{"time":1393358160000,"tempi":27,"hum":56,"precipi":0,"conds":0.75,"dewpti":12.9,"wspdi":12.7,"pressurei":30},{"time":1393360680000,"tempi":26.6,"hum":64,"precipi":0,"conds":1,"dewpti":15.8,"wspdi":10.4,"pressurei":29.95},{"time":1393361760000,"tempi":27,"hum":61,"precipi":0,"conds":1,"dewpti":15.1,"wspdi":9.2,"pressurei":29.97},{"time":1393362480000,"tempi":26.6,"hum":64,"precipi":0,"conds":1,"dewpti":15.8,"wspdi":9.2,"pressurei":29.93},{"time":1393363320000,"tempi":28.4,"hum":51,"precipi":0,"conds":1,"dewpti":12.2,"wspdi":10.4,"pressurei":29.92},{"time":1393365360000,"tempi":28,"hum":51,"precipi":0,"conds":0.75,"dewpti":12,"wspdi":10.4,"pressurei":29.94},{"time":1393368960000,"tempi":28.9,"hum":54,"precipi":0,"conds":1,"dewpti":14,"wspdi":15,"pressurei":29.94},{"time":1393372560000,"tempi":28,"hum":53,"precipi":0,"conds":0.75,"dewpti":12.9,"wspdi":13.8,"pressurei":29.93},{"time":1393376160000,"tempi":28,"hum":51,"precipi":0,"conds":0.75,"dewpti":12,"wspdi":10.4,"pressurei":29.93},{"time":1393379760000,"tempi":27,"hum":56,"precipi":0,"conds":0.5,"dewpti":12.9,"wspdi":11.5,"pressurei":29.95},{"time":1393383360000,"tempi":27,"hum":47,"precipi":0,"conds":0,"dewpti":9,"wspdi":13.8,"pressurei":29.98},{"time":1393386960000,"tempi":25,"hum":46,"precipi":0,"conds":0,"dewpti":7,"wspdi":11.5,"pressurei":29.99},{"time":1393390560000,"tempi":24.1,"hum":46,"precipi":0,"conds":0,"dewpti":6.1,"wspdi":10.4,"pressurei":30},{"time":1393394160000,"tempi":21.9,"hum":51,"precipi":0,"conds":0,"dewpti":6.1,"wspdi":9.2,"pressurei":30},{"time":1393397760000,"tempi":19.9,"hum":55,"precipi":0,"conds":0,"dewpti":6.1,"wspdi":0,"pressurei":30},{"time":1393401360000,"tempi":19.9,"hum":55,"precipi":0,"conds":0,"dewpti":6.1,"wspdi":0,"pressurei":29.97},{"time":1393404960000,"tempi":18,"hum":62,"precipi":0,"conds":0,"dewpti":7,"wspdi":0,"pressurei":29.98},{"time":1393408560000,"tempi":18,"hum":62,"precipi":0,"conds":0,"dewpti":7,"wspdi":0,"pressurei":29.97},{"time":1393412160000,"tempi":18,"hum":68,"precipi":0,"conds":0,"dewpti":9,"wspdi":0,"pressurei":29.94},{"time":1393415760000,"tempi":19.9,"hum":57,"precipi":0,"conds":0,"dewpti":7,"wspdi":0,"pressurei":29.93},{"time":1393419360000,"tempi":21.9,"hum":53,"precipi":0,"conds":0,"dewpti":7,"wspdi":0,"pressurei":29.92},{"time":1393422960000,"tempi":23,"hum":50,"precipi":0,"conds":1,"dewpti":7,"wspdi":3.5,"pressurei":29.9},{"time":1393426560000,"tempi":23,"hum":53,"precipi":0,"conds":1,"dewpti":8.1,"wspdi":4.6,"pressurei":29.89},{"time":1393430160000,"tempi":24.1,"hum":53,"precipi":0,"conds":1,"dewpti":9,"wspdi":5.8,"pressurei":29.9},{"time":1393433760000,"tempi":25,"hum":51,"precipi":0,"conds":1,"dewpti":9,"wspdi":8.1,"pressurei":29.9},{"time":1393435560000,"tempi":24.8,"hum":64,"precipi":0,"conds":1,"dewpti":14,"wspdi":6.9,"pressurei":29.88},{"time":1393437360000,"tempi":23,"hum":81,"precipi":0,"conds":1,"dewpti":18,"wspdi":5.8,"pressurei":29.93},{"time":1393438620000,"tempi":24.8,"hum":80,"precipi":0,"conds":1,"dewpti":19.4,"wspdi":4.6,"pressurei":29.89},{"time":1393439760000,"tempi":24.8,"hum":80,"precipi":0,"conds":1,"dewpti":19.4,"wspdi":9.2,"pressurei":29.89},{"time":1393440960000,"tempi":25,"hum":78,"precipi":0,"conds":0.75,"dewpti":19,"wspdi":5.8,"pressurei":29.92},{"time":1393444560000,"tempi":26.1,"hum":63,"precipi":0,"conds":0.75,"dewpti":15.1,"wspdi":8.1,"pressurei":29.88},{"time":1393447020000,"tempi":26.6,"hum":64,"precipi":0,"conds":1,"dewpti":15.8,"wspdi":18.4,"pressurei":29.82},{"time":1393448160000,"tempi":23,"hum":85,"precipi":0,"conds":1,"dewpti":19,"wspdi":12.7,"pressurei":29.86},{"time":1393449300000,"tempi":24.8,"hum":74,"precipi":0,"conds":1,"dewpti":17.6,"wspdi":10.4,"pressurei":29.82},{"time":1393451760000,"tempi":27,"hum":53,"precipi":0,"conds":0.75,"dewpti":12,"wspdi":12.7,"pressurei":29.83},{"time":1393455360000,"tempi":27,"hum":43,"precipi":0,"conds":0.75,"dewpti":7,"wspdi":16.1,"pressurei":29.83},{"time":1393458960000,"tempi":26.1,"hum":37,"precipi":0,"conds":0.5,"dewpti":3,"wspdi":15,"pressurei":29.83},{"time":1393462560000,"tempi":24.1,"hum":34,"precipi":0,"conds":0.5,"dewpti":-0.9,"wspdi":21.9,"pressurei":29.83},{"time":1393466160000,"tempi":21.9,"hum":32,"precipi":0,"conds":0,"dewpti":-4,"wspdi":11.5,"pressurei":29.84},{"time":1393469760000,"tempi":19.9,"hum":33,"precipi":0,"conds":0,"dewpti":-5.1,"wspdi":9.2,"pressurei":29.86},{"time":1393473360000,"tempi":19,"hum":33,"precipi":0,"conds":0,"dewpti":-6,"wspdi":6.9,"pressurei":29.87},{"time":1393476960000,"tempi":17.1,"hum":37,"precipi":0,"conds":0,"dewpti":-5.1,"wspdi":4.6,"pressurei":29.88},{"time":1393480560000,"tempi":16,"hum":36,"precipi":0,"conds":0,"dewpti":-7.1,"wspdi":3.5,"pressurei":29.9},{"time":1393484160000,"tempi":14,"hum":43,"precipi":0,"conds":0,"dewpti":-5.1,"wspdi":0,"pressurei":29.9},{"time":1393487760000,"tempi":12,"hum":53,"precipi":0,"conds":0,"dewpti":-2,"wspdi":0,"pressurei":29.9},{"time":1393491360000,"tempi":12,"hum":49,"precipi":0,"conds":0,"dewpti":-4,"wspdi":0,"pressurei":29.88},{"time":1393494960000,"tempi":10.9,"hum":47,"precipi":0,"conds":0,"dewpti":-6,"wspdi":0,"pressurei":29.86},{"time":1393498560000,"tempi":10.9,"hum":47,"precipi":0,"conds":0,"dewpti":-6,"wspdi":0,"pressurei":29.84},{"time":1393502160000,"tempi":10.9,"hum":42,"precipi":0,"conds":0,"dewpti":-8,"wspdi":3.5,"pressurei":29.81},{"time":1393505760000,"tempi":10.9,"hum":44,"precipi":0,"conds":0,"dewpti":-7.1,"wspdi":5.8,"pressurei":29.79},{"time":1393509360000,"tempi":10,"hum":51,"precipi":0,"conds":0,"dewpti":-5.1,"wspdi":0,"pressurei":29.77},{"time":1393512960000,"tempi":10.9,"hum":56,"precipi":0,"conds":0,"dewpti":-2,"wspdi":0,"pressurei":29.76},{"time":1393516560000,"tempi":16,"hum":54,"precipi":0,"conds":0.75,"dewpti":1.9,"wspdi":5.8,"pressurei":29.73},{"time":1393520160000,"tempi":19.9,"hum":55,"precipi":0,"conds":0.5,"dewpti":6.1,"wspdi":0,"pressurei":29.72},{"time":1393523760000,"tempi":24.1,"hum":51,"precipi":0,"conds":0.25,"dewpti":8.1,"wspdi":6.9,"pressurei":29.71},{"time":1393527360000,"tempi":27,"hum":39,"precipi":0,"conds":0.75,"dewpti":5,"wspdi":8.1,"pressurei":29.68},{"time":1393530960000,"tempi":27,"hum":37,"precipi":0,"conds":0.75,"dewpti":3.9,"wspdi":12.7,"pressurei":29.65},{"time":1393534560000,"tempi":28.9,"hum":38,"precipi":0,"conds":0.25,"dewpti":6.1,"wspdi":12.7,"pressurei":29.63},{"time":1393537020000,"tempi":26.6,"hum":51,"precipi":0,"conds":1,"dewpti":10.4,"wspdi":18.4,"pressurei":29.6},{"time":1393537440000,"tempi":24.8,"hum":59,"precipi":0,"conds":1,"dewpti":12.2,"wspdi":12.7,"pressurei":29.6},{"time":1393538160000,"tempi":25,"hum":60,"precipi":0,"conds":0.75,"dewpti":12.9,"wspdi":8.1,"pressurei":29.63},{"time":1393541760000,"tempi":28,"hum":33,"precipi":0,"conds":0.25,"dewpti":1.9,"wspdi":16.1,"pressurei":29.66},{"time":1393545360000,"tempi":27,"hum":37,"precipi":0,"conds":0.25,"dewpti":3.9,"wspdi":15,"pressurei":29.68},{"time":1393548960000,"tempi":26.1,"hum":34,"precipi":0,"conds":0.75,"dewpti":1,"wspdi":17.3,"pressurei":29.7},{"time":1393552560000,"tempi":25,"hum":36,"precipi":0,"conds":0.25,"dewpti":1,"wspdi":11.5,"pressurei":29.74},{"time":1393556160000,"tempi":23,"hum":58,"precipi":0,"conds":1,"dewpti":10,"wspdi":19.6,"pressurei":29.81},{"time":1393559760000,"tempi":19.9,"hum":38,"precipi":0,"conds":0.25,"dewpti":-2,"wspdi":20.7,"pressurei":29.88},{"time":1393563360000,"tempi":16,"hum":32,"precipi":0,"conds":0,"dewpti":-9,"wspdi":27.6,"pressurei":29.94},{"time":1393566960000,"tempi":14,"hum":31,"precipi":0,"conds":0,"dewpti":-11.9,"wspdi":19.6,"pressurei":29.99},{"time":1393570560000,"tempi":12,"hum":32,"precipi":0,"conds":0,"dewpti":-13,"wspdi":19.6,"pressurei":30.03},{"time":1393574160000,"tempi":10.9,"hum":37,"precipi":0,"conds":0,"dewpti":-11,"wspdi":13.8,"pressurei":30.08},{"time":1393577760000,"tempi":9,"hum":38,"precipi":0,"conds":0,"dewpti":-11.9,"wspdi":17.3,"pressurei":30.12},{"time":1393581360000,"tempi":9,"hum":36,"precipi":0,"conds":0,"dewpti":-13,"wspdi":13.8,"pressurei":30.15},{"time":1393584960000,"tempi":8.1,"hum":38,"precipi":0,"conds":0,"dewpti":-13,"wspdi":15,"pressurei":30.17},{"time":1393588560000,"tempi":8.1,"hum":40,"precipi":0,"conds":0,"dewpti":-11.9,"wspdi":13.8,"pressurei":30.19},{"time":1393592160000,"tempi":7,"hum":46,"precipi":0,"conds":0,"dewpti":-9.9,"wspdi":16.1,"pressurei":30.23},{"time":1393595760000,"tempi":7,"hum":48,"precipi":0,"conds":0,"dewpti":-9,"wspdi":16.1,"pressurei":30.26},{"time":1393599360000,"tempi":7,"hum":51,"precipi":0,"conds":0,"dewpti":-8,"wspdi":12.7,"pressurei":30.29},{"time":1393602960000,"tempi":8.1,"hum":48,"precipi":0,"conds":0,"dewpti":-8,"wspdi":9.2,"pressurei":30.33},{"time":1393606560000,"tempi":10,"hum":44,"precipi":0,"conds":0,"dewpti":-8,"wspdi":8.1,"pressurei":30.37},{"time":1393610160000,"tempi":12,"hum":42,"precipi":0,"conds":0,"dewpti":-7.1,"wspdi":8.1,"pressurei":30.39},{"time":1393613760000,"tempi":14,"hum":39,"precipi":0,"conds":0,"dewpti":-7.1,"wspdi":9.2,"pressurei":30.4},{"time":1393617360000,"tempi":16,"hum":36,"precipi":0,"conds":0,"dewpti":-7.1,"wspdi":12.7,"pressurei":30.4},{"time":1393620960000,"tempi":17.1,"hum":37,"precipi":0,"conds":0,"dewpti":-5.1,"wspdi":11.5,"pressurei":30.38},{"time":1393624560000,"tempi":18,"hum":35,"precipi":0,"conds":0,"dewpti":-6,"wspdi":9.2,"pressurei":30.38},{"time":1393628160000,"tempi":19.9,"hum":33,"precipi":0,"conds":0,"dewpti":-5.1,"wspdi":8.1,"pressurei":30.39},{"time":1393631760000,"tempi":19.9,"hum":32,"precipi":0,"conds":0,"dewpti":-6,"wspdi":4.6,"pressurei":30.38},{"time":1393635360000,"tempi":19.9,"hum":32,"precipi":0,"conds":0,"dewpti":-6,"wspdi":8.1,"pressurei":30.39},{"time":1393638960000,"tempi":19.9,"hum":29,"precipi":0,"conds":0,"dewpti":-8,"wspdi":0,"pressurei":30.39},{"time":1393642560000,"tempi":17.1,"hum":39,"precipi":0,"conds":0,"dewpti":-4,"wspdi":0,"pressurei":30.41},{"time":1393646160000,"tempi":16,"hum":47,"precipi":0,"conds":0,"dewpti":-0.9,"wspdi":0,"pressurei":30.41},{"time":1393649760000,"tempi":16,"hum":43,"precipi":0,"conds":0,"dewpti":-2.9,"wspdi":0,"pressurei":30.43},{"time":1393653360000,"tempi":14,"hum":56,"precipi":0,"conds":0,"dewpti":1,"wspdi":3.5,"pressurei":30.44},{"time":1393656960000,"tempi":12,"hum":59,"precipi":0,"conds":0,"dewpti":0,"wspdi":3.5,"pressurei":30.44},{"time":1393660560000,"tempi":12,"hum":61,"precipi":0,"conds":0,"dewpti":1,"wspdi":0,"pressurei":30.44},{"time":1393664160000,"tempi":10.9,"hum":64,"precipi":0,"conds":0,"dewpti":1,"wspdi":4.6,"pressurei":30.43},{"time":1393667760000,"tempi":10.9,"hum":64,"precipi":0,"conds":0,"dewpti":1,"wspdi":4.6,"pressurei":30.43},{"time":1393671360000,"tempi":10,"hum":64,"precipi":0,"conds":0,"dewpti":0,"wspdi":4.6,"pressurei":30.42},{"time":1393674960000,"tempi":10,"hum":64,"precipi":0,"conds":0,"dewpti":0,"wspdi":4.6,"pressurei":30.41},{"time":1393678560000,"tempi":10,"hum":61,"precipi":0,"conds":0,"dewpti":-0.9,"wspdi":3.5,"pressurei":30.41},{"time":1393682160000,"tempi":10,"hum":64,"precipi":0,"conds":0,"dewpti":0,"wspdi":4.6,"pressurei":30.41},{"time":1393685760000,"tempi":10.9,"hum":64,"precipi":0,"conds":0,"dewpti":1,"wspdi":0,"pressurei":30.4},{"time":1393689360000,"tempi":18,"hum":45,"precipi":0,"conds":0,"dewpti":0,"wspdi":0,"pressurei":30.41},{"time":1393692960000,"tempi":21.9,"hum":53,"precipi":0,"conds":0,"dewpti":7,"wspdi":4.6,"pressurei":30.41},{"time":1393696560000,"tempi":25,"hum":46,"precipi":0,"conds":0,"dewpti":7,"wspdi":10.4,"pressurei":30.4},{"time":1393700160000,"tempi":26.1,"hum":49,"precipi":0,"conds":0,"dewpti":9,"wspdi":6.9,"pressurei":30.38},{"time":1393703760000,"tempi":28.9,"hum":45,"precipi":0,"conds":0,"dewpti":10,"wspdi":4.6,"pressurei":30.35},{"time":1393707360000,"tempi":30.9,"hum":38,"precipi":0,"conds":0,"dewpti":8.1,"wspdi":8.1,"pressurei":30.3},{"time":1393710960000,"tempi":32,"hum":44,"precipi":0,"conds":0.5,"dewpti":12,"wspdi":9.2,"pressurei":30.27},{"time":1393714560000,"tempi":33.1,"hum":43,"precipi":0,"conds":0,"dewpti":12.9,"wspdi":8.1,"pressurei":30.25},{"time":1393718160000,"tempi":34,"hum":44,"precipi":0,"conds":1,"dewpti":14,"wspdi":0,"pressurei":30.25},{"time":1393721760000,"tempi":33.1,"hum":42,"precipi":0,"conds":0.75,"dewpti":12,"wspdi":4.6,"pressurei":30.23},{"time":1393725360000,"tempi":33.1,"hum":43,"precipi":0,"conds":0.75,"dewpti":12.9,"wspdi":0,"pressurei":30.22},{"time":1393728960000,"tempi":32,"hum":59,"precipi":0,"conds":1,"dewpti":19,"wspdi":4.6,"pressurei":30.22},{"time":1393732560000,"tempi":32,"hum":61,"precipi":0,"conds":1,"dewpti":19.9,"wspdi":0,"pressurei":30.21},{"time":1393736160000,"tempi":33.1,"hum":52,"precipi":0,"conds":0.75,"dewpti":17.1,"wspdi":0,"pressurei":30.19},{"time":1393739760000,"tempi":33.1,"hum":48,"precipi":0,"conds":1,"dewpti":15.1,"wspdi":0,"pressurei":30.19},{"time":1393743360000,"tempi":32,"hum":54,"precipi":0,"conds":1,"dewpti":17.1,"wspdi":0,"pressurei":30.17},{"time":1393746960000,"tempi":33.1,"hum":50,"precipi":0,"conds":1,"dewpti":16,"wspdi":0,"pressurei":30.15},{"time":1393750560000,"tempi":32,"hum":50,"precipi":0,"conds":0.75,"dewpti":15.1,"wspdi":3.5,"pressurei":30.13},{"time":1393754160000,"tempi":33.1,"hum":46,"precipi":0,"conds":0.75,"dewpti":14,"wspdi":3.5,"pressurei":30.11},{"time":1393757760000,"tempi":33.1,"hum":46,"precipi":0,"conds":0.75,"dewpti":14,"wspdi":3.5,"pressurei":30.09},{"time":1393761360000,"tempi":33.1,"hum":48,"precipi":0,"conds":0.75,"dewpti":15.1,"wspdi":3.5,"pressurei":30.07},{"time":1393764960000,"tempi":33.1,"hum":48,"precipi":0,"conds":0.75,"dewpti":15.1,"wspdi":0,"pressurei":30.07},{"time":1393768560000,"tempi":32,"hum":54,"precipi":0,"conds":1,"dewpti":17.1,"wspdi":0,"pressurei":30.06},{"time":1393772160000,"tempi":33.1,"hum":52,"precipi":0,"conds":1,"dewpti":17.1,"wspdi":4.6,"pressurei":30.09},{"time":1393775760000,"tempi":33.1,"hum":54,"precipi":0,"conds":1,"dewpti":18,"wspdi":4.6,"pressurei":30.08},{"time":1393779360000,"tempi":33.1,"hum":56,"precipi":0,"conds":1,"dewpti":19,"wspdi":4.6,"pressurei":30.08},{"time":1393782960000,"tempi":35.1,"hum":50,"precipi":0,"conds":1,"dewpti":18,"wspdi":3.5,"pressurei":30.07},{"time":1393786560000,"tempi":35.1,"hum":54,"precipi":0,"conds":1,"dewpti":19.9,"wspdi":4.6,"pressurei":30.07},{"time":1393790160000,"tempi":36,"hum":52,"precipi":0,"conds":0.75,"dewpti":19.9,"wspdi":6.9,"pressurei":30.06},{"time":1393793760000,"tempi":37,"hum":50,"precipi":0,"conds":1,"dewpti":19.9,"wspdi":4.6,"pressurei":30.01},{"time":1393797360000,"tempi":36,"hum":55,"precipi":0,"conds":1,"dewpti":21,"wspdi":8.1,"pressurei":29.99},{"time":1393800960000,"tempi":36,"hum":55,"precipi":0,"conds":1,"dewpti":21,"wspdi":8.1,"pressurei":30},{"time":1393804560000,"tempi":36,"hum":57,"precipi":0,"conds":1,"dewpti":21.9,"wspdi":10.4,"pressurei":30.01},{"time":1393808160000,"tempi":35.1,"hum":57,"precipi":0,"conds":1,"dewpti":21,"wspdi":6.9,"pressurei":30.01},{"time":1393811760000,"tempi":35.1,"hum":57,"precipi":0,"conds":1,"dewpti":21,"wspdi":4.6,"pressurei":30.02},{"time":1393815360000,"tempi":34,"hum":52,"precipi":0,"conds":1,"dewpti":18,"wspdi":8.1,"pressurei":30.02},{"time":1393818960000,"tempi":33.1,"hum":56,"precipi":0,"conds":1,"dewpti":19,"wspdi":5.8,"pressurei":30.01},{"time":1393822560000,"tempi":33.1,"hum":52,"precipi":0,"conds":1,"dewpti":17.1,"wspdi":8.1,"pressurei":30.01},{"time":1393826160000,"tempi":32,"hum":54,"precipi":0,"conds":1,"dewpti":17.1,"wspdi":8.1,"pressurei":30.01},{"time":1393829760000,"tempi":30,"hum":54,"precipi":0,"conds":1,"dewpti":15.1,"wspdi":8.1,"pressurei":30.01},{"time":1393833360000,"tempi":28,"hum":53,"precipi":0,"conds":1,"dewpti":12.9,"wspdi":13.8,"pressurei":30.02}],"summary":[{"time":1393012800000,"avg_tempi":38.627027027027026,"avg_hum":93.37837837837837,"avg_precipi":0.006956521739130436,"avg_conds":0.8445945945945946,"avg_dewpti":36.76216216216216,"avg_wspdi":8.075675675675674,"avg_pressurei":29.85081081081081,"day_conds":100},{"time":1393099200000,"avg_tempi":43.166666666666664,"avg_hum":49.916666666666664,"avg_precipi":0,"avg_conds":0,"avg_dewpti":23.087500000000002,"avg_wspdi":5.095454545454545,"avg_pressurei":29.9825,"day_conds":0},{"time":1393185600000,"avg_tempi":43.3125,"avg_hum":51.708333333333336,"avg_precipi":0,"avg_conds":0.4722222222222222,"avg_dewpti":25.904166666666672,"avg_wspdi":4.237500000000001,"avg_pressurei":29.930000000000007,"day_conds":11.4},{"time":1393272000000,"avg_tempi":31.825,"avg_hum":44.666666666666664,"avg_precipi":0,"avg_conds":0.34375,"avg_dewpti":12.266666666666671,"avg_wspdi":14.920833333333333,"avg_pressurei":29.908749999999994,"day_conds":22.7},{"time":1393358400000,"avg_tempi":24.137037037037036,"avg_hum":53.592592592592595,"avg_precipi":0,"avg_conds":0.48,"avg_dewpti":9.344444444444443,"avg_wspdi":9.307407407407409,"avg_pressurei":30.001481481481484,"day_conds":60.699999999999996},{"time":1393444800000,"avg_tempi":21.996551724137934,"avg_hum":55.58620689655172,"avg_precipi":0,"avg_conds":0.625,"avg_dewpti":7.382758620689656,"avg_wspdi":8.554166666666667,"avg_pressurei":29.885862068965523,"day_conds":82.8},{"time":1393531200000,"avg_tempi":19.142307692307693,"avg_hum":44.15384615384615,"avg_precipi":0,"avg_conds":0.4605263157894737,"avg_dewpti":-0.026923076923077032,"avg_wspdi":11.978260869565217,"avg_pressurei":29.775769230769235,"day_conds":46.2},{"time":1393617600000,"avg_tempi":13.2125,"avg_hum":42.041666666666664,"avg_precipi":0,"avg_conds":0,"avg_dewpti":-6.499999999999999,"avg_wspdi":8.35833333333333,"avg_pressurei":30.340833333333332,"day_conds":0},{"time":1393704000000,"avg_tempi":24.337500000000006,"avg_hum":52.541666666666664,"avg_precipi":0,"avg_conds":0.7954545454545454,"avg_dewpti":8.799999999999999,"avg_wspdi":3.649999999999999,"avg_pressurei":30.31291666666667,"day_conds":4.5},{"time":1393790400000,"avg_tempi":33.63750000000001,"avg_hum":52.583333333333336,"avg_precipi":0,"avg_conds":0.9375,"avg_dewpti":17.80416666666667,"avg_wspdi":5.729166666666667,"avg_pressurei":30.04583333333333,"day_conds":93.2}],"totals":{"clouds":[{"status":"Cloudy","value":"42.1"},{"status":"Clear","value":"57.9"}]}}
		$scope.label = "Temperature"
		$scope.key = 'avg_tempi';	
	}
])

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
  		$scope.graphStates = {}; //store collapse/open state of graphs
  		$scope.rawStates = {}; //store collapse/open state of raw data
  		$scope.dataFields = {  
  			observation: {	// automatically display the correct name in charts	
	  			tempi: {name: 'tempi', displayName: 'Temperature', order: 0, active: true},
	  			hum: {name: 'hum', displayName: 'Humidity', order: 3, active: false},
	  			precipi: {name: 'precipi', displayName: 'Precipitation', order:2, active: false},
	  			conds: {name: 'conds', displayName: 'Cloud Cover', order: 1, active: true},  
	  			dewpti: {name: 'dewpti', displayName: 'Dewpoint', order: 4, active: false},
	  			wspdi: {name: 'wspdi', displayName: 'Wind Speed', order: 5, active: false},
	  			pressurei: {name: 'pressurei', displayName: 'Pressure', order: 6, active: false} 	 			
  			}, 
  			summary: {
  				day_conds: {name: 'day_conds', displayName: 'Avg Daytime Cloud Cover', order: 0, active: true},
	  			avg_tempi: {name: 'tempi', displayName: 'Avg Temperature', order: 2, active: false},
	  			avg_hum: {name: 'hum', displayName: 'Avg Humidity', order: 4, active: false},
	  			avg_precipi: {name: 'precipi', displayName: 'Avg Precipitation', order:3, active: false},
	  			avg_conds: {name: 'conds', displayName: 'Avg Cloud Cover', order: 1, active: false},  
	  			avg_dewpti: {name: 'dewpti', displayName: 'Avg Dewpoint', order: 5, active: false},
	  			avg_wspdi: {name: 'wspdi', displayName: 'Avg Wind Speed', order: 6, active: false},
	  			avg_pressurei: {name: 'pressurei', displayName: 'Avg Pressure', order: 7, active: false} 		  				
  			}
  		};

  		//used in raw data table to show human readable date
  		$scope.date = function(date) {return new Date(date);}
  		// used to translate key to display name 
  		// key will be a prop. of either 'summary' or 'observation'
  		$scope.getName = function(key) { 
			return $scope.dataFields.observation.hasOwnProperty(key) ? $scope.dataFields.observation[key].displayName : $scope.dataFields.summary[key].displayName
  		}

		$scope.getLocation = function () {
			//get user coordinates using  HTML5 GeoLocation API in Browser
			//Only Modern Browsers supported
			$scope.weatherSvc.getUserLocation().then(function(data){
				$scope.coords = {lat:data.coords.latitude, lng:data.coords.longitude};
				$scope.formData.location = $scope.coords.lat + "," + $scope.coords.lng;
				clearErrorMessages();
			});
		}

		//listen for error message from GeoLocation service
		$scope.$on('geolocation_error', function(event, message){
			$scope.formData.geolocationErrorMessage = "Error: " + message + ".  Enter a location manually.";
		})

		$scope.parseUserLocation = function (loadWeather) {
			//if HTML5 Geolocation API fails or is denied
			//get coordinates from user entered location
			if ($scope.formData.location) {
				$scope.weatherSvc.geocodeUserInput($scope.formData.location).then(function(data){
					$scope.coords = data;
					if (loadWeather) {$scope.loadWeather();}
				}, function (error) {
					$scope.formData.locationValidationMessage = "No matching locations";
				})
			}
		}

		$scope.onLocationChange = function() {
			//clear coords and the location err msgs 
			//when the user starts typing a location
			$scope.coords = {};
			clearErrorMessages();
		}

		function clearErrorMessages() {
			$scope.formData.locationValidationMessage = "";
			$scope.formData.geolocationErrorMessage = "";
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
				if ( e && (e < s) ) { return "End Date cannot be before Start Date"; }
				if ( e && (e > maxEnd) ) { return "Maximum report length is 9 days"; }
				
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

				var fields = [];
				for (key in $scope.dataFields.observation) {
					if ($scope.dataFields.observation[key].active === true) {
						fields.push($scope.dataFields.observation[key].name)
					} 
				}
				var summaryFields = [];				
				for (key in $scope.dataFields.summary) {
					if ($scope.dataFields.summary[key].active === true && key!=='day_conds') {
						summaryFields.push($scope.dataFields.summary[key].name)
					} 
				}

				var request = {
					query: query, 
					startDate: start, 
					endDate: end, 
					fields: fields.join(','),
					summaryFields: summaryFields.join(',')
				}
				$scope.weatherSvc.getHistoricalWeather(request).then(function(data){
					$scope.graphStates = {}; //all graphs = show
					$scope.weatherData = data
					// calculate avg daily cloudiness over the duration
					var cloudyTotal = data.summary.reduce(function(a,b){return a + b.day_conds},0)/data.summary.length;	
					$scope.weatherData.totals = {clouds: [ 
													{status: "Cloudy" , value: cloudyTotal},
													{status: "Clear" , value: 100 - cloudyTotal }
												]};
					// make visible the HTML
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