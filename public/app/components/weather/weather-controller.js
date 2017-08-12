function WeatherController() {
	var _this = this;
	var service = new WeatherService();

	/* TODO:
	 * What to show:
	 * 		Bonus:
	 * 			A way to change the city (search by zip or city/state) - if no response, give error tooltip, and keep the current data up
	 * 			Long hover (> 1s?) brings up tooltip saying click to change the measurement unit
	 * 			An arrow showing the wind, with speed in mph below it (bonus points for fatter arrows showing intensity)
	 * 				Perhaps a way to switch to kph?
	 * 				Mayhap this should only show up on hover?
	 */

	function drawWeather(weather) {
		var template = `
			<img src='//openweathermap.org/img/w/${weather.weather[0].icon}.png' id="weather-icon" alt="weather icon">
			<div>
				<p id="temperature" onclick="app.controllers.weather.convertTemp()"></p>
				<p id="city">${weather.name}</p>
			</div>
		`;
		$("#weather").html(template);
		drawTemperature(weather.main.temp);
	}

	function drawTemperature(temp) {
		var unit = service.getMeasurementUnit();
		$("#temperature").html(`${Math.round(temp)}&#176${unit}`);
	}

	this.getWeather = function () {
		service.getWeather(drawWeather);
	}

	this.convertTemp = function() {
		service.convertTemp(drawTemperature);
	}

	service.start(drawWeather);
}
