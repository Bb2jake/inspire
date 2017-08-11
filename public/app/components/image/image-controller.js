function ImageController() {
	var self = this;
	var service = new ImageService();

	function drawImage (image) {
		document.getElementById('background').style.backgroundImage = `url('${image}')`;
	}

	this.getImage = function() {
		service.getImage(drawImage);
	}
}
