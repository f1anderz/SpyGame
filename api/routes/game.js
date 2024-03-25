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
    Game.findOne({
        _id: req.params.id, featuredLocation: req.body.locationID
    }).populate({path: 'users'}).exec().then((game) => {
        if (game) {
            game.winners = [game.spy];
            game.save().then(() => {
                res.status(200).json({message: 'Guess correct'});
            }).catch((err) => {
                console.log(err)
                res.status(500).json(err);
            });
        } else {
            Game.findOne({_id: req.params.id}).exec().then((game) => {
                game.winners = [];
                game.users.forEach((user) => {
                    RoomUser.findOne({$and: [{_id: user}, {_id: {$ne: game.spy}}]}).exec().then((roomUser) => {
                        if (roomUser) {
                            game.winners.push(roomUser);
                        }
                    }).catch((err) => {
                        console.log(err)
                        res.status(500).json(err);
                    });
                });
                setTimeout(() => {
                    game.save().then(() => {
                        res.status(200).json({message: 'Guess incorrect'});
                    }).catch((err) => {
                        console.log(err)
                        res.status(500).json(err);
                    });
                }, 200);
            }).catch((err) => {
                console.log(err)
                res.status(500).json(err);
            });
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    })
});

router.patch('/suspectSpy/:id', (req, res, next) => {
    RoomUser.findOne({user: req.body.userID}).exec().then((result) => {
        if (result.suspectsLeft > 0) {
            result.suspectsLeft = 0;
            result.voted = true;
            result.save().then(() => {
                RoomUser.updateOne({_id: req.body.spyID}, {
                    $set: {suspected: true, voted: true}, $inc: {votes: 1}
                }).exec().then().catch((err) => {
                    res.status(500).json(err);
                });
            }).catch((err) => {
                res.status(500).json(err);
            });
        } else {
            res.status(200).json('can`t suspect');
        }
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.patch('/voteSpy/:id', (req, res, next) => {
    RoomUser.updateOne({user: req.body.userID}, {$set: {voted: true}}).exec().then(() => {
        if (req.body.vote) {
            RoomUser.updateOne({_id: req.body.spyID}, {$inc: {votes: 1}}).exec().then((result) => {
            }).catch((err) => {
                res.status(500).json(err);
            });
        } else {
            RoomUser.updateOne({_id: req.body.spyID}, {$inc: {votes: -1}}).exec().then((result) => {
            }).catch((err) => {
                res.status(500).json(err);
            });
        }
        Game.findOne({_id: req.params.id}).populate({path: 'users'}).exec().then((game) => {
            let flag = true;
            game.users.forEach((user) => {
                if (user.voted === false) {
                    flag = false;
                }
            });
            if (flag) {
                RoomUser.findOne({_id: req.body.spyID}).exec().then((result) => {
                    if (result.votes > 0) {
                        result.kicked = true;
                        result.save().then(() => {
                            RoomUser.updateMany({}, {
                                $set: {
                                    suspected: false, voted: false, votes: 0
                                }
                            }).exec().then().catch((err) => {
                                res.status(500).json(err);
                            });
                            Game.findOne({
                                _id: req.params.id, spy: req.body.spyID
                            }).populate({path: 'users'}).exec().then((game) => {
                                if (game) {
                                    game.winners = game.users.filter((user) => {
                                        return user.kicked === false;
                                    });
                                    game.save().then(() => {
                                        res.status(200).json('kicked');
                                    }).catch((err) => {
                                        res.status(500).json(err);
                                    });
                                }
                            }).catch((err) => {
                                res.status(500).json(err);
                            });
                        }).catch((err) => {
                            res.status(500).json(err);
                        });
                    } else {
                        RoomUser.updateMany({}, {
                            $set: {
                                suspected: false, voted: false, votes: 0
                            }
                        }).exec().then(() => {
                            res.status(200).json('reset');
                        }).catch((err) => {
                            res.status(500).json(err);
                        });
                    }
                }).catch((err) => {
                    res.status(500).json(err);
                });
            } else {
                res.status(200).json('voted for');
            }
        }).catch((err) => {
            res.status(500).json(err);
        });
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.patch('/distributePoints/:id', (req, res, next) => {

});

module.exports = router;