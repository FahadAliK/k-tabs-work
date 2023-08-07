#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
	if (error0) {
		throw error0;
	}
	connection.createChannel(function (error1, channel) {
		if (error1) {
			throw error1;
		}

		var queue = 'hello';
		var msg = 'Hello World!';
		var msg = JSON.stringify({
			id: Math.ceil(Math.random() * 10),
			message: 'Hello World',
		});

		channel.assertQueue(queue, {
			durable: true,
		});
		channel.sendToQueue(queue, Buffer.from(msg));

		console.log(' [x] Sent %s', msg);
	});
	setTimeout(function () {
		connection.close();
		process.exit(0);
	}, 500);
});

// for (let i = 1; i <= 1000; i++) {
// 	console.log(Math.ceil(Math.random() * 10)); // 1 to 10
// 	console.log(Math.floor(Math.random() * 10)); // 0 to 9
// }
