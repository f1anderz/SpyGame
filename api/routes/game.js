const express = require("express");
const router = express.Router();

const Game = require("../models/game");
const mongoose = require("mongoose");

router.get('/', (req, res, next) => {
    Game.find({}).populate('users', 'username').populate('locationsCollection').exec().then((result) => {
        res.status(200).json({
            status: true, data: {
                message: "Fetched all games", games: result
            }
        });
    }).catch((err) => {
        res.status(500).json({
            status: false, error: err
        });
    });
});

router.get('/:id', (req, res, next) => {
    Game.findOne({_id: req.params.id}).populate('user', 'username').populate('locationsCollection').exec().then((result) => {
        res.status(200).json({
            status: true, data: {
                message: "Fetched game with id " + req.params.id, game: result
            }
        });
    }).catch((err) => {
        res.status(500).json({
            status: false, error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const game = new Game({
        _id: new mongoose.Types.ObjectId(),
        users: [req.body.userID],
        locationsCollection: req.body.locationsCollectionID
    });
    game.save().then((result) => {
        res.status(201).json({
            status: true, data: {
                message: "Inserted game with id " + result._id, insertID: result._id
            }
        });
    }).catch((err) => {
        res.status(500).json({
            status: false, error: err
        });
    });
});

router.patch('/:id', (req, res, next) => {
    let game = {};
    Game.findOne({_id: req.params.id}).exec().then((result) => {
        if (result !== null) {
            game = result;
            game.users.push(req.body.userID);
            game.save().then((result) => {
                res.status(200).json({
                    status: true, data: {
                        message: "Inserted userID " + req.body.userID + " to game with id " + req.params.id
                    }
                });
            }).catch((err) => {
                res.status(500).json({
                    status: false, error: err
                });
            })
        } else {
            res.status(404).json({
                status: false, error: {
                    message: "Game with id " + req.params.id + " not found"
                }
            });
        }
    }).catch((err) => {
        res.status(500).json({
            status: false, error: err
        });
    });
});

module.exports = router;