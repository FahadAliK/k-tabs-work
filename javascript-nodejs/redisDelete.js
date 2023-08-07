const Redis = require('ioredis');
const redis = new Redis();

const key = 'test_key';
redis
	.del(key)
	.then((result) => {
		if (result === 1) {
			console.log('Key deleted from Redis.');
		} else {
			console.log('Key not found in Redis.');
		}
	})
	.catch((err) => {
		console.error('Error deleting key from Redis:', err);
	});
