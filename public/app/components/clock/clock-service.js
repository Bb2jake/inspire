function ClockService() {
	var _this = this;
	var isMilitary = false;
	var userName = "Jake";
	var shownTime = '';

	this.getTime = function (drawClock) {
		let date = new Date();
		let append = '';
		let hours = date.getHours();
		let greeting = getGreeting(hours);
		let minutes = date.getMinutes();

		if (minutes < 10)
			minutes = "0" + minutes;

		if (!isMilitary) {
			if (hours >= 12) {
				hours -= 12;
				// TODO: Have am/pm only show up on hover, and not displace the clock
				append = 'pm';
			} else {
				append = 'am';
			}
		}

		let time = hours + ":" + minutes + append;
		if (time != shownTime) {
			shownTime = time;
			drawClock(time, greeting, userName);
		}
	}

	function getGreeting(hours) {
		if (hours < 12)
			return "Good morning, ";
		else if (hours < 18)
			return "Good afternoon, ";
		else
			return "Good evening, ";
	}

	this.toggleMilitaryTime = function (getTime) {
		isMilitary = !isMilitary;
		localStorage.setItem('isMilitary', JSON.stringify(isMilitary));
		getTime();
	}

	this.updateTimer = function (getTime) {
		isMilitary = JSON.parse(localStorage.getItem('isMilitary')) || false;
		getTime();
		setInterval(getTime, 1000);
	}
}