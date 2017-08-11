function QuoteService(){
	var url = '//bcw-getter.herokuapp.com/?url=';
	// var url2 = 'http://quotesondesign.com/api/3.0/api-3.0.json';
	var url2 = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
	var apiUrl = url + encodeURIComponent(url2);
	//Do Not Edit above we have to go through the bcw-getter to access this api
	
	this.getQuote =  function(drawQuote){
		$.get(apiUrl, function(quoteObj){
			quoteObj = JSON.parse(quoteObj)
			drawQuote(quoteObj[0])
		})
	}
}
