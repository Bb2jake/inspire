function ImageController() {
	var _this = this;
	var service = new ImageService();
	var loadingIconInterval;

	function drawImage(image) {
		document.getElementById('background').style.backgroundImage = `url('${image}')`;
		$('#background-info p').html('Get new image');
		$('#background-info').on('click', _this.getImage);
		stopLoadingIcon();
	}

	this.getImage = function () {
		$('#background-info p').html('Loading Image...');
		$('#background-info').off('click');
		spinLoadingIcon();

		service.getImage(drawImage);
	}

	function spinLoadingIcon() {
		var degrees = 0;
		let icon = document.getElementById('loading-icon');
		loadingIconInterval = setInterval(() => {
			degrees += 12;
			icon.style.transform = `rotate(${degrees}deg)`
		}, 1000 / 30);
	}

	function stopLoadingIcon() {
		if (loadingIconInterval) {
			clearInterval(loadingIconInterval);
			loadingIconInterval = null;
			document.getElementById('loading-icon').style.transform = "rotate(0deg)"
		}
	}

	_this.getImage();
}
