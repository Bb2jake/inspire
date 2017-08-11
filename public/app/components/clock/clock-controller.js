function ClockController() {
	var _this = this;
	var service = new ClockService();

	function getTime() {
		service.getTime(drawClock);
	}

	function drawClock(time, greeting, userName) {
		$('#clock-text').html(time);
		$('#greeting-text').html(greeting + userName);
	}

	this.toggleMilitaryTime = function() {
		service.toggleMilitaryTime(getTime);
	}
	
	service.updateTimer(getTime);
}