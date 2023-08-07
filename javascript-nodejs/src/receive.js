#!/usr/bin/env node
const fs = require('fs');
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
		channel.assertQueue(queue, {
			durable: true,
		});
		const options = { noAck: true }; // Set noAck to true to automatically acknowledge the message
		// const options = { noAck: false }; // Set noAck to true to automatically acknowledge the message
		let message;
		do {
			channel.get(queue, options, (error, message) => {
				if (message) {
					console.log('Browsing message:', message.content.toString());
					// Process the message here
					// Since we used noAck: true, the message remains in the queue
					// You can continue to loop through the messages until there are no more
				}
			});
		} while (message);
		console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
		// channel.get(queue, options,(error));
		// console.log({ channel });
		// channel.consume(
		// 	queue,
		// 	function (msg) {
		// 		console.log(' [x] Received %s', msg.content.toString());
		// 		// 'You can perform further actions upon receiving message, for example some DB operations or call another API.'
		// 		// console.log(JSON.parse(msg.content.toString()));
		// 		const parsedMessage = JSON.parse(msg.content.toString());
		// 		// console.log(parsedMessage.timeStamp);
		// 		// console.log(parsedMessage.timeStamp.split(':')[2]);
		// 		const seconds = parseInt(parsedMessage.timeStamp.split(':')[2]) + 1;
		// 		const currentSeconds = new Date().getSeconds() + 1;
		// 		console.log(seconds, currentSeconds);
		// 		if (seconds - currentSeconds === 0) {
		// 			fs.appendFile('example.json', msg.content.toString() + ',', (err) => {
		// 				if (err) {
		// 					console.error('Error writing to file:', err);
		// 				} else {
		// 					console.log('Data written to the file successfully!');
		// 				}
		// 			});
		// 		} else {
		// 		}
		// 	},
		// 	{
		// 		noAck: true,
		// 		// noAck: false,
		// 	}
		// );
	});
});
