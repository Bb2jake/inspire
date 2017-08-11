function WeatherController() {
	var self = this;
	var weatherService = new WeatherService();

	/* TODO:
	 * What to show:
	 * 		Temp (clicking changes between C, F, and K)
	 * 		Icon showing the weather (sun for clear, clouds for overcast, etc)
	 * 
	 * 		Bonus:
	 * 			An arrow showing the wind, with speed in mph below it (bonus points for fatter arrows showing intensity)
	 * 				Perhaps a way to switch to kph?
	 * 				Mayhap this should only show up on hover?
	 */

	weatherService.getWeather(weather => {
		
	})

}
