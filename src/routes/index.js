const express = require('express');
const app = express()
const loginRoute = require('./loginRoute')
const studentDetails = require('./student.routes')
const registerRoute = require('./register')
const fetchDetails = require('./fetchDetails')
const circularRoutes = require('./circularRoutes')
const activityRoutes = require('./activityRoutes')
app.use('/login', loginRoute );

app.use('/students', studentDetails)
app.use('/register', registerRoute )
app.use('/fetchDetails', fetchDetails)
app.use('/circular', circularRoutes)
app.use('/activity', activityRoutes)
app.get('/', async (_req, res, _next) => {
	// optional: add further things to check (e.g. connecting to dababase)
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.json(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send(healthcheck);
	}
});

module.exports = app