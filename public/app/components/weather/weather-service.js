function WeatherService() {
	var url = '//bcw-getter.herokuapp.com/?url=';
	var url2 = 'http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=bd82255fd0a21fa1238699b9eda2ee35'
	var apiUrl = url + encodeURIComponent(url2);

	// TODO: Save current measurement unit to DB
	this.getWeather = function (drawWeather) {
		$.get(apiUrl, weather => {
			weather = JSON.parse(weather)
			drawWeather(weather);
		})
	}
}
