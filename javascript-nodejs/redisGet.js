const Redis = require('ioredis');
const redis = new Redis();

const key = 'test_key';

redis
	.get(key)
	.then((result) => {
		if (result === null) {
			console.log('Key not found in Redis.');
		} else {
			console.log('Retrieved value from Redis:', result);
		}
	})
	.catch((err) => {
		console.error('Error retrieving value from Redis:', err);
	});
