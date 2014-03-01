// given a start and end time, return array of
// dates formatted as weather underground expects
// in the request URL
exports.formatDatesWU = function(start, end) {
	var dates = [];
	var start = new Date(parseInt(start, 10));
	var end = new Date(parseInt(end, 10)||start);
	console.log("start: " + start + " end: " + end)
	//format the date in YYYYMMDD as the WU API expects 
	function formatDate(date){
		var ret = date.getFullYear() 
		ret += date.getMonth() < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) 
		ret += date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		return ret;
	}
	//push formatted date into function's return value 
	//then add a day and repeat until end date is exceeded
	while (start.getTime() <= end.getTime()) {
		dates.push(formatDate(start));
		//adding +1 to day rolls over other values 
		//as well, ie 20131231 + 1 = 20140101
		start.setDate(start.getDate() + 1);
	}
	return dates;
};
