const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const amqp = require('amqplib');
const asyncHandler = require('./middleware/async');
const { getTimeStamp } = require('./utils/functions');
const { v4: uuid } = require('uuid');
const connectDB = require('./config/connectDB');

// Load env vars
require('dotenv').config({ path: './config/server.env' });

// Connect to database
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.post(
	'/api/v1/demo',
	asyncHandler(async (req, res, next) => {
		// const queueName = 'task_queue';
		const queueName = 'hello';
		// const message = 'Hello, RabbitMQ!';
		const message = JSON.stringify({
			...req.body,
			// timeStamp: getTimeStamp(),
			timeStamp: new Date(),
		});

		// Connect to RabbitMQ server
		const connection = await amqp.connect('amqp://localhost');
		const channel = await connection.createChannel();

		// Ensure the queue exists (it will be created if not exists)
		await channel.assertQueue(queueName, { durable: true });

		// Send the message to the queue
		channel.sendToQueue(queueName, Buffer.from(message), {
			// timestamp: getTimeStamp(),
			correlationId: uuid(),
		});

		// Close the connection
		await channel.close();
		await connection.close();

		res.json({
			success: true,
			senderId: req.body.id,
			message: 'Message sent to RabbitMQ queue.',
		});
	})
);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server & exit process
	// server.close(() => process.exit(1));
});

// rabbit mq
