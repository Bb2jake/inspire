function ClockController() {
	var _this = this;
	var service = new ClockService();

	function getTime(userName) {
		service.getTime(drawClock, userName);
	}

	function drawClock(time, greeting, userName) {
		$('#clock-text').html(time);
		$('#greeting-text').text(greeting);
		if (userName) {
			$('#user-name').val(userName);
		}
		_this.resizeForText($('#user-name').val());
	}

	this.toggleMilitaryTime = function () {
		service.toggleMilitaryTime(getTime);
	}

	// Resize based on text if text.length > 0
	// Otherwise resize based on the placeholder
	this.resizeForText = function (e) {
		var text = e.target ? e.target.value : e;
		var $this = $('#user-name');
		if (!text.trim()) {
			text = $this.attr('placeholder').trim();
		}
		var $span = $this.parent().find('span');
		$span.text(text);
		var $inputSize = $span.width();
		$this.css("width", $inputSize);
	}

	this.blurForm = function (e) {
		e.preventDefault();
		$('#user-name').blur();
	}

	this.finishedUserName = function (e) {
		e.preventDefault();
		service.saveUserName(e.target.value);
	}

	service.updateTimer(getTime);
}