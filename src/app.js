const express = require('express');
const routes = require('./routes');
const { initializeDatabase } = require('./database/init');

const app = express();

app.use(express.json());
app.use('/api', routes);

initializeDatabase();

module.exports = app;