const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();

const userRoutes = require("./api/routes/user");
const gameRoutes = require("./api/routes/game");
const collectionRoutes = require("./api/routes/collection");
const locationRoutes = require("./api/routes/location");

mongoose.connect('mongodb+srv://f1anderz:' + process.env.MONGO_ATLAS_PW + '@spy-game.jydpt3u.mongodb.net/?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
});

app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/collections', collectionRoutes);
app.use('/locations', locationRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            status: false,
            message: err.message
        }
    })
});

module.exports = app;