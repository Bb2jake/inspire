function WeatherService() {
	var url = '//bcw-getter.herokuapp.com/?url=';
	var url2 = 'http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=bd82255fd0a21fa1238699b9eda2ee35'
	var apiUrl = url + encodeURIComponent(url2);

	this.getWeather = function (drawWeather) {
		$.get(apiUrl, weather => {
			weather = JSON.parse(weather)
			// TODO: Only save what's needed to the DB. Current measurement unit is all I can see needing saved atm.
			drawWeather(weather);
		})
	}
}
