function QuoteController() {
	var _this = this;
	var service = new QuoteService()

	// TODO: Put stylized quote marks/images at beginning/eng of quote
	function drawQuote(quoteObj) {
		template = `
			${quoteObj.content}
			<p id="quote-author">-${quoteObj.title}<p>
		`;

		$("#quote").html(template);
		$("#quote").show();
	}

	this.getQuote = function () {
		$("#quote").hide();
		service.getQuote(drawQuote);
	}

	this.showAuthor = function () {
		$("#quote-author").show();
	}

	this.hideAuthor = function () {
		$("#quote-author").hide();
	}

	_this.getQuote();
}
