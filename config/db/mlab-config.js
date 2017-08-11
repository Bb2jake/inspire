var mongoose = require('mongoose');

mongoose.connect('mongodb://bb2jake:unlimited@ds034807.mlab.com:34807/inspire', {
	server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});

mongoose.connection.on('error', err => {
	console.error('Something failed when connecting to mlab', err);
});

mongoose.connection.once('open', () => {
	console.log('Connected to mlab');
});