const express = require("express");
const app = express();

const userRoutes = require("./api/routes/user");
const gameRoutes = require("./api/routes/game");

app.use('/users', userRoutes);
app.use('/games', gameRoutes);

module.exports = app;