function WeatherController() {
	var _this = this;
	var service = new WeatherService();
	var currentUnit = "C";
	var temp;

	/* TODO:
	 * What to show:
	 * 		Temp (clicking changes between C, F, and K)
	 * 		Icon showing the weather (sun for clear, clouds for overcast, etc)
	 * 
	 * 		Bonus:
	 * 			A way to change the city (search by zip or city/state) - if no response, give error tooltip, and keep the current data up
	 * 			Long hover (> 1s?) brings up tooltip saying click to change the measurement unit
	 * 			An arrow showing the wind, with speed in mph below it (bonus points for fatter arrows showing intensity)
	 * 				Perhaps a way to switch to kph?
	 * 				Mayhap this should only show up on hover?
	 */

	function drawWeather(weather) {
		console.log(weather);
		temp = weather.main.temp;
		var template = `
			<img src='//openweathermap.org/img/w/${weather.weather[0].icon}.png' id="weather-icon" alt="weather icon">
			<div>
				<p id="temperature" onclick="app.controllers.weather.convertTemp()"></p>
				<p id="city">${weather.name}</p>
			</div>
		`;
		$("#weather").html(template);
		convertToCelcius();
	}

	function drawTemperature() {
		$("#temperature").html(`${Math.round(temp)}&#176${currentUnit}`);
	}

	this.convertTemp = function () {
		if (currentUnit == "C")
			convertToFahrenheit();
		else if (currentUnit == "F")
			convertToKelvin()
		else
			convertToCelcius()
	}

	function convertToCelcius() {
		temp = temp - 273.15;
		currentUnit = "C";
		drawTemperature();
	}

	function convertToFahrenheit() {
		temp = temp * 1.8 + 32;
		currentUnit = "F";
		drawTemperature();
	}

	function convertToKelvin() {
		temp = (temp + 459.67) * 5 / 9;
		currentUnit = "K";
		drawTemperature();
	}

	this.getWeather = function () {
		service.getWeather(drawWeather);
	}

	_this.getWeather();
}
