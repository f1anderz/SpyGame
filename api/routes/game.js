const express = require("express");
const router = express.Router();

const Game = require("../models/game");
const mongoose = require("mongoose");

router.get('/:id', (req, res, next) => {
    Game.findOne({_id: req.params.id}).populate({
        path: 'spy', populate: {path: 'user', select: '_id username'}, select: '_id user'
    }).populate({
        path: 'users', populate: {path: 'user', select: '_id username'}
    }).populate({
        path: 'featuredLocation'
    }).populate({
        path: 'locationsCollection', populate: {path: 'locations'}
    }).exec().then((result) => {
        res.status(200).json({
            message: "Fetched game with id " + req.params.id, game: result
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/guessLocation/:id', (req, res, next) => {
    Game.findOne({_id: req.params.id, featuredLocation: req.body.locationID}).exec().then((game) => {
        if (game) {
            res.status(200).json({guess: true})
        } else {
            res.status(200).json({guess: false})
        }
    }).catch((err) => {
        res.status(500).json(err);
    })
});

router.patch('/guessSpy/:id', (req, res, next) => {
    Game.findOne({_id: req.params.id, spy: req.body.spyID}).exec().then((game) => {
        if (game) {
            res.status(200).json({guess: true})
        } else {
            res.status(200).json({guess: false})
        }
    }).catch((err) => {
        res.status(500).json(err);
    })
});

module.exports = router;