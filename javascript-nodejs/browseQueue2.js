const amqp = require('amqplib');
const Redis = require('ioredis');
const redis = new Redis();
const { getSecondsDifference } = require('./utils/functions');

async function browseQueue() {
	const connection = await amqp.connect('amqp://localhost');
	const channel = await connection.createChannel();

	const queueName = 'hello2';
	await channel.assertQueue(queueName);

	// Set noAck to true to automatically acknowledge the message
	// const options = { noAck: true };
	const options = { noAck: false };

	let message;
	do {
		message = await channel.get(queueName, options);
		if (message) {
			// console.log({ message });
			console.log('Browsing message:', message.content.toString());
			// console.log(message.properties.correlationId);
			// Process the message here
			// break;
			// console.log(JSON.parse(message.content.toString()).timeStamp);
			const parsedMessage = JSON.parse(message.content.toString());
			// const timeStamp = JSON.parse(message.content.toString()).timeStamp;
			const { timeStamp, retryCount } = parsedMessage;
			// console.log(getSecondsDifference(new Date(), new Date(timeStamp)));
			const secDifference = getSecondsDifference(
				new Date(),
				new Date(timeStamp)
			);
			// Get value from redis
			const key = 'test_key';
			const configObject = JSON.parse(await redis.get(key));
			// console.log(configObject);
			if (
				configObject.IB[retryCount] &&
				secDifference >= configObject.IB[retryCount].interval
			) {
				console.log(secDifference);
				// const queueName = 'hello2';
				// const parsedMessage = JSON.parse(message.content.toString());
				const obj = {
					...parsedMessage,
					retryCount: parsedMessage.retryCount + 1,
				};
				console.log(obj);
				await channel.assertQueue(queueName);
				channel.sendToQueue(queueName, Buffer.from(JSON.stringify(obj)));
				channel.ack(message);
			}
			// Since we used noAck: true, the message remains in the queue
			// You can continue to loop through the messages until there are no more
		}
	} while (message);

	await channel.close();
	await connection.close();
}

// browseQueue().catch(console.error);

setInterval(() => {
	console.log('Browsing messages from queue 2...');
	browseQueue().catch(console.error);
}, (process.argv[2] && process.argv[2] * 1000) || 1000);
