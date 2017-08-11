function ImageController() {
	var _this = this;
	var service = new ImageService();

	function drawImage (image) {
		// TODO: Should also show information on the image in the lower left of the image.
		document.getElementById('background').style.backgroundImage = `url('${image}')`;
	}

	this.getImage = function() {
		service.getImage(drawImage);
	}
}
