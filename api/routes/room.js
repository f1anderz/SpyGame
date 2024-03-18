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
    Room.findOne({_id: req.params.id}).populate({
        path: 'currentGame', populate: {path: 'spy', populate: {path: 'user', select: ['_id', 'username']}}
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
        _id: new mongoose.Types.ObjectId(), user: req.body.hostID, score: 0, suspectsLeft: 0, isHost: true
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
            if (room.password === req.body.password) {
                let roomUser = new RoomUser({
                    _id: new mongoose.Types.ObjectId(), user: req.body.userID, score: 0, suspectsLeft: 0
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

router.patch('/startGame/:id', (req, res, next) => {
    let room = {};
    let featuredLocation;
    Room.findOne({_id: req.params.id}).populate('users').exec().then((result) => {
        if (result !== null) {
            room = result;
            LocationsCollection.findOne({_id: req.body.locationsCollectionID}).exec().then(async (result) => {
                featuredLocation = result.locations[Math.round(Math.random() * result.locations.length)];
                let spy = room.users[Math.round(Math.random() * room.users.length)];
                const game = new Game({
                    _id: new mongoose.Types.ObjectId(),
                    spy: spy._id,
                    locationsCollection: req.body.locationsCollectionID,
                    featuredLocation: featuredLocation
                });
                game.save().then((result) => {
                    room.currentGame = result._id;
                    room.users.forEach((user) => {
                        user.suspectsLeft = Math.floor(room.users.length / 4);
                    });
                    room.save().then((result) => {
                        res.status(200).json({
                            message: "Inserted game " + room.currentGame + " to room with id " + result._id,
                            data: result
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