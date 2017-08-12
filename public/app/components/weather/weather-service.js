function WeatherService() {
	var _this = this;
	var url = '//bcw-getter.herokuapp.com/?url=';
	var url2 = 'http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=bd82255fd0a21fa1238699b9eda2ee35'
	var apiUrl = url + encodeURIComponent(url2);
	var weather;
	var measurementUnit = 'K'; // Comes from api as kelvin

	this.start = function (drawWeather) {
		measurementUnit = localStorage.getItem('measurementUnit') || 'K';
		_this.getWeather(drawWeather);
	}

	this.getMeasurementUnit = function () {
		return measurementUnit;
	}

	this.getWeather = function (drawWeather) {
		$.get(apiUrl, weatherObj => {
			weather = JSON.parse(weatherObj)
			initialConversion();
			drawWeather(weather);
		})
	}

	function initialConversion() {
		if (measurementUnit == 'C' || measurementUnit == 'F') {
			convertToCelcius(false);
			if (measurementUnit == 'F')
				convertToFahrenheit(false);
		}
	}

	this.convertTemp = function (drawTemp) {
		if (measurementUnit == "C")
			convertToFahrenheit();
		else if (measurementUnit == "F")
			convertToKelvin()
		else
			convertToCelcius()

		drawTemp(weather.main.temp);
		localStorage.setItem('measurementUnit', measurementUnit);
	}

	function convertToCelcius(setUnit = true) {
		weather.main.temp = weather.main.temp - 273.15;
		if (setUnit)
			measurementUnit = "C";
	}

	function convertToFahrenheit(setUnit = true) {
		weather.main.temp = weather.main.temp * 1.8 + 32;
		if (setUnit)
			measurementUnit = "F";
	}

	function convertToKelvin(setUnit = true) {
		weather.main.temp = (weather.main.temp + 459.67) * 5 / 9;
		if (setUnit)
			measurementUnit = "K";
	}
}
