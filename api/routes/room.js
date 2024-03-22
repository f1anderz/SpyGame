const express = require('express');
const router = express.Router();

const Room = require('../models/room');
const RoomUser = require('../models/roomUser');
const Game = require('../models/game');
const LocationsCollection = require('../models/locationsCollection');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Room.find({}).exec().then((result) => {
        res.status(200).json({
            message: "Fetched all rooms", rooms: result
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:id', (req, res, next) => {
    Room.findOne({_id: req.params.id}).select('_id users').populate({
        path: 'currentGame', populate: [{path: 'spy', populate: {path: 'user', select: ['_id', 'username']}}, {
            path: 'users', populate: {path: 'user', select: ['_id']}
        }]
    }).populate({
        path: 'users', populate: {path: 'user', select: ['_id', 'username']}
    }).exec().then((result) => {
        res.status(200).json({
            message: "Fetched room with id " + req.params.id, room: result
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    let roomUser = new RoomUser({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.hostID,
        score: 0,
        suspectsLeft: 0,
        isHost: true,
        suspected: false,
        voted: false,
        votes: 0,
        kicked: false,
        guessed: false
    });
    const room = new Room({
        _id: new mongoose.Types.ObjectId(), users: [], password: req.body.password
    });
    roomUser.save().then((result) => {
        room.users.push(result._id);
        room.save().then((result) => {
            res.status(201).json({
                message: "Inserted room with id " + result._id, roomID: result._id
            });
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/join/:id', (req, res, next) => {
    Room.findOne({_id: req.params.id}).exec().then((room) => {
        if (room !== null) {
            if (room.users.length < 16) {
                if (room.password === req.body.password) {
                    let roomUser = new RoomUser({
                        _id: new mongoose.Types.ObjectId(),
                        user: req.body.userID,
                        score: 0,
                        suspectsLeft: 0,
                        suspected: false,
                        voted: false,
                        votes: 0,
                        kicked: false,
                        guessed: false
                    });
                    roomUser.save().then((result) => {
                        room.users.push(result._id);
                        room.save().then((result) => {
                            res.status(200).json({
                                message: "Inserted userID " + req.body.userID + " to room with id " + req.params.id,
                                roomID: req.params.id
                            });
                        }).catch((err) => {
                            res.status(500).json({
                                error: err
                            });
                        });
                    }).catch((err) => {
                        res.status(500).json({
                            error: err
                        });
                    });
                } else {
                    res.status(401).json({
                        error: {
                            message: "Incorrect room password"
                        }
                    });
                }
            } else {
                res.status(400).json({
                    error: {
                        message: "Room full"
                    }
                });
            }
        } else {
            res.status(404).json({
                error: {
                    message: "Room with id " + req.params.id + " not found"
                }
            });
        }
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/leave/:id', (req, res, next) => {
    RoomUser.findOne({user: req.body.userID}).exec().then((result) => {
        if (result) {
            if (result.isHost) {
                Room.findOne({_id: req.params.id}).exec().then((result) => {
                    if (result) {
                        result.users.forEach((user) => {
                            RoomUser.deleteOne({_id: user._id}).exec().then().catch((err) => {
                                res.status(500).json(err);
                            });
                        });
                        Game.deleteOne({_id: result.currentGame}).exec().then().catch((err) => {
                            res.status(500).json(err);
                        });
                        Room.deleteOne({_id: req.params.id}).exec().then(() => {
                            res.status(200).json(`User ${req.body.userID} removed from room ${req.params.id}`);
                        }).catch((err) => {
                            res.status(500).json(err);
                        });
                    } else {
                        res.status(404).json({message: `Room with id ${req.params.id} not found`})
                    }
                }).catch((err) => {
                    res.status(500).json(err);
                });
            } else {
                Room.updateOne({_id: req.params.id}, {
                    $pull: {
                        users: result._id
                    }
                }).exec().then((result) => {
                    if (result.modifiedCount === 1) {
                        RoomUser.deleteOne({user: req.body.userID}).exec().then(() => {
                            res.status(200).json(`User ${req.body.userID} removed from room ${req.params.id}`);
                        }).catch((err) => {
                            res.status(500).json({error: err, message: 'RoomUserDelete'});
                        });
                    } else {
                        res.status(404).json({
                            message: `User with id ${req.body.userID} not found in room ${req.params.id}`
                        });
                    }
                }).catch((err) => {
                    res.status(500).json({error: err, message: 'RoomUpdate'});
                });
            }
        } else {
            res.status(404).json({
                message: `User with id ${req.body.userID} not found in any room`
            });
        }
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.patch('/kick/:id', (req, res, next) => {
    RoomUser.findOne({user: req.body.userID}).exec().then((result) => {
        if (result) {
            Room.updateOne({_id: req.params.id}, {
                $pull: {
                    users: result._id
                }
            }).exec().then((result) => {
                if (result.modifiedCount === 1) {
                    RoomUser.deleteOne({user: req.body.userID}).exec().then(() => {
                        res.status(200).json(`User ${req.body.userID} removed from room ${req.params.id}`);
                    }).catch((err) => {
                        res.status(500).json({error: err, message: 'RoomUserKick'});
                    });
                } else {
                    res.status(404).json({
                        message: `User with id ${req.body.userID} not found in room ${req.params.id}`
                    });
                }
            }).catch((err) => {
                res.status(500).json({error: err, message: 'RoomUpdate'});
            });
        } else {
            res.status(404).json({
                message: `User with id ${req.body.userID} not found in any room`
            });
        }
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.patch('/startGame/:id', (req, res, next) => {
    let featuredLocation;
    Room.findOne({_id: req.params.id}).populate('users').exec().then((room) => {
        if (room !== null) {
            if (room.users.length >= 4) {
                LocationsCollection.findOne({_id: req.body.collectionID}).exec().then(async (result) => {
                    featuredLocation = result.locations[Math.round(Math.random() * result.locations.length)];
                    let spy = room.users[Math.round(Math.random() * room.users.length)];
                    let now = new Date();
                    let timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
                    const game = new Game({
                        _id: new mongoose.Types.ObjectId(),
                        spy: spy._id,
                        users: room.users,
                        locationsCollection: req.body.collectionID,
                        featuredLocation: featuredLocation,
                        endless: req.body.endless,
                        roundTime: req.body.roundTime,
                        roundStartTime: timeString,
                        roundTimeLeft: req.body.roundTime
                    });
                    game.save().then(async (result) => {
                        room.currentGame = result._id;
                        room.users.forEach((user) => {
                            RoomUser.updateOne({_id: user._id}, {
                                $set: {
                                    suspectsLeft: Math.floor(result.users.length / 4),
                                    suspected: false,
                                    voted: false,
                                    votes: 0,
                                    kicked: false,
                                    guessed: false
                                }
                            }).exec().then().catch((err) => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                        });
                        room.save().then((result) => {
                            res.status(200).json({
                                message: "Inserted game " + result.currentGame + " to room with id " + result._id,
                                room: result
                            });
                        }).catch((err) => {
                            res.status(500).json({
                                error: err
                            });
                        });
                    }).catch((err) => {
                        res.status(500).json({
                            error: err
                        });
                    });
                }).catch((err) => {
                    res.status(500).json({
                        error: err
                    });
                });
            } else {
                res.status(500).json({
                    error: {
                        message: "You need at least 4 users to start a game"
                    }
                });
            }
        } else {
            res.status(404).json({
                error: {
                    message: "Room with id " + req.params.id + " not found"
                }
            });
        }
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;