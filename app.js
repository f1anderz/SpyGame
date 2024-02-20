const express = require("express");
const morgan = require("morgan");
require('dotenv').config();
const app = express();

const userRoutes = require("./api/routes/user");
const gameRoutes = require("./api/routes/game");

app.use(morgan('dev'));

app.use('/users', userRoutes);
app.use('/games', gameRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error:{
            status: false,
            message: err.message
        }
    })
});

module.exports = app;