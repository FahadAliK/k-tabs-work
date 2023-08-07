const Redis = require('ioredis');
const redis = new Redis();

// Assuming you have a key and value to store
const key = 'test_key';
const value = JSON.stringify({
	IB: [
		{ retryCount: 0, interval: 0 },
		{ retryCount: 1, interval: 5 },
		{ retryCount: 2, interval: 10 },
		{ retryCount: 3, interval: 15 },
	],
	ATM: [
		{ retryCount: 0, interval: 0 },
		{ retryCount: 1, interval: 5 },
		{ retryCount: 2, interval: 10 },
		{ retryCount: 3, interval: 15 },
	],
});

redis
	.set(key, value)
	.then(() => {
		console.log('Value stored in Redis.');
	})
	.catch((err) => {
		console.error('Error storing value in Redis:', err);
	});
