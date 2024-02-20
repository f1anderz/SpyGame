const express = require("express");
const morgan = require("morgan");
require('dotenv').config();
const app = express();

const userRoutes = require("./api/routes/user");
const gameRoutes = require("./api/routes/game");

app.use(morgan('dev'));

app.use('/users', userRoutes);
app.use('/games', gameRoutes);

module.exports = app;