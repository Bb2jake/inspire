function WeatherService() {
	var _this = this;
	var coords;
	var url = '//bcw-getter.herokuapp.com/?url=';
	var apiBase = 'http://api.openweathermap.org/data/2.5/weather?';
	var apiKey = '&APPID=bd82255fd0a21fa1238699b9eda2ee35';
	var weather;
	var measurementUnit = 'K'; // Comes from api as kelvin

	function getApiUrl() {
		var query = "q=boise";
		if (coords) {
			query = `lat=${coords.latitude}&lon=${coords.longitude}`;
		}
		return apiUrl = url + encodeURIComponent(apiBase + query + apiKey);
	}

	this.start = function (drawWeather) {
		measurementUnit = localStorage.getItem('measurementUnit') || 'K';
		getGeolocation(drawWeather);
	}

	function getGeolocation(drawWeather) {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				coords = position.coords;
				_this.getWeather(drawWeather);
			}, () => {
				_this.getWeather(drawWeather);
			})
		} else {
			_this.getWeather(drawWeather);
		}
	}

	this.getMeasurementUnit = function () {
		return measurementUnit;
	}

	this.getWeather = function (drawWeather) {
		$.get(getApiUrl(), weatherObj => {
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
