const express = require('express');
const router = express.Router();

const Game = require('../models/game');
const RoomUser = require('../models/roomUser');
const mongoose = require('mongoose');

router.get('/:id', (req, res, next) => {
    Game.findOne({_id: req.params.id}).populate({
        path: 'spy', populate: {path: 'user', select: '_id username'}, select: '_id user'
    }).populate({
        path: 'users', populate: {path: 'user', select: '_id username'}
    }).populate({
        path: 'featuredLocation'
    }).populate({
        path: 'locationsCollection', populate: {path: 'locations'}
    }).exec().then((game) => {
        if (game.endless === false) {
            let now = new Date();
            let timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
            let [hours, minutes, seconds] = game.roundStartTime.split(':').map(Number);
            let totalMinutes = hours * 60 + minutes + Number(game.roundTime);
            let result = `${String(Math.floor(totalMinutes / 60) % 24).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            if (result === timeString) {
                RoomUser.find({_id: game.spy}).exec().then((result) => {
                    game.winners = result;
                    game.save().then(() => {
                    }).catch((err) => {
                        res.status(500).json(err);
                    });
                }).catch((err) => {
                    res.status(500).json(err);
                });
            }
        }
        res.status(200).json({
            message: "Fetched game with id " + req.params.id, game: game
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
            RoomUser.find({_id: game.spy}).exec().then((result) => {
                game.winners = result;
                game.save().then(() => {
                }).catch((err) => {
                    res.status(500).json(err);
                });
            }).catch((err) => {
                res.status(500).json(err);
            });
        } else {
            RoomUser.find({_id: {$ne: game.spy}}).exec().then((result) => {
                game.winners = result;
                game.save().then(() => {
                }).catch((err) => {
                    res.status(500).json(err);
                });
            }).catch((err) => {
                res.status(500).json(err);
            });
        }
        res.status(200).json({message: 'Guess made'});
    }).catch((err) => {
        res.status(500).json(err);
    })
});

router.patch('/suspectSpy/:id', (req, res, next) => {
    RoomUser.findOne({user: req.body.userID}).exec().then((result) => {
        result.suspectsLeft -= 1;
        result.voted = true;
        result.save().then(() => {
            RoomUser.updateOne({_id: req.body.spyID}, {
                $set: {suspected: true}, $inc: {votes: 1}
            }).exec().then().catch((err) => {
                res.status(500).json(err);
            });
        }).catch((err) => {
            res.status(500).json(err);
        });
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.patch('/voteSpy:id', (req, res, next) => {
    RoomUser.updateOne({_id: req.body.spyID}, {$inc: {votes: 1}}).exec().then(() => {
        RoomUser.updateOne({_id: req.body.userID}, {$set: {voted: true}}).exec().then(() => {
            res.status(200).json('voted');
        }).catch((err) => {
            res.status(500).json(err);
        });
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.patch('/failKick:id', (req, res, next) => {
    RoomUser.updateMany({}, {$set: {suspected: false, voted: false, votes: 0}}).exec().then(() => {
        res.status(200).json('reset');
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.patch('/kickUser:id', (req, res, next) => {
    RoomUser.updateOne({_id: req.body.userID}, {$set: {kicked: true}}).exec().then(() => {
        RoomUser.updateMany({}, {$set: {suspected: false, voted: false, votes: 0}}).exec().then().catch((err) => {
            res.status(500).json(err);
        });
        Game.findOne({_id: req.params.id}).exec().then((game) => {
            if (game.spy === req.params.userID) {
                game.winners = game.users.filter((user) => {
                    return user.kicked === true
                });
                game.save().then().catch((err) => {
                    res.status(500).json(err);
                });
            }
            res.status(200).json('kicked');
        }).catch((err) => {
            res.status(500).json(err);
        });
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.patch('/distributePoints:id', (req, res, next) => {

});

module.exports = router;