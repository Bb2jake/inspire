function ClockService() {
	var _this = this;
	var isMilitary = false;
	var userName = "";
	var shownTime = '';

	this.getTime = function (drawClock, name) {
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
				append = 'pm';
			} else {
				append = 'am';
			}
		}

		let time = hours + ":" + minutes + append;
		if (time != shownTime) {
			shownTime = time;
			drawClock(time, greeting, name);
		}
	}

	function getGreeting(hours) {
		if (hours < 12)
			return "Good morning,";
		else if (hours < 18)
			return "Good afternoon,";
		else
			return "Good evening,";
	}

	this.toggleMilitaryTime = function (getTime) {
		isMilitary = !isMilitary;
		localStorage.setItem('isMilitary', JSON.stringify(isMilitary));
		getTime();
	}

	this.updateTimer = function (getTime, checkName) {
		isMilitary = JSON.parse(localStorage.getItem('isMilitary')) || false;
		userName = localStorage.getItem('userName') || '';
		getTime(userName);
		checkName(userName);
		setInterval(getTime, 1000);
	}

	this.saveUserName = function (name) {
		userName = name;
		localStorage.setItem('userName', userName);
	}
}