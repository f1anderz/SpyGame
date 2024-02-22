const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();

const key = process.env.API_KEY;

const userRoutes = require("./api/routes/user");
const gameRoutes = require("./api/routes/game");
const locationsCollectionRoutes = require("./api/routes/locationsCollection");
const locationRoutes = require("./api/routes/location");

mongoose.connect('mongodb+srv://f1anderz:' + process.env.MONGO_ATLAS_PW + '@spy-game.jydpt3u.mongodb.net/?retryWrites=true&w=majority');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    bcrypt.compare(req.headers["x-api-key"], key, (err, response) => {
        if (response) {
            next();
        } else {
            res.status(401).json({
                status: false,
                message: "No API authorization"
            });
        }
    });
});

app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/locationsCollections', locationsCollectionRoutes);
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