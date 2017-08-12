function ImageController() {
	var _this = this;
	var service = new ImageService();

	function drawImage(image) {
		document.getElementById('background').style.backgroundImage = `url('${image}')`;
		$('#background-info p').html('Get new image');
		$('#background-info').on('click', _this.getImage);
	}

	this.getImage = function () {
		service.getImage(drawImage);
	}

	_this.getImage();
}
