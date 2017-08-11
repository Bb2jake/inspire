var mongoose = require('mongoose');
var connection = mongoose.connection;

mongoose.connect('mongodb://bb2jake:unlimited@ds064799.mlab.com:64799/gregslist', {
	server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});

connection.on('error', err => {
	console.error('Something failed when connecting to mlab', err);
});

connection.once('open', () => {
	console.log('Connected to mlab');
});