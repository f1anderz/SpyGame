const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const User = require("../models/user");

router.get('/', (req, res, next) => {
    User.find({}).exec().then((doc) => {
        res.status(200).json({
            message: "Fetched all users", users: doc
        });
    }).catch((err) => {
        res.status(404).json({
            error: err
        });
    });
});

router.get('/:id', (req, res, next) => {
    User.findOne({_id: req.params.id}).exec().then((doc) => {
        if (doc !== null) {
            res.status(200).json({
                message: "Fetched user with id " + req.params.id, user: doc
            });
        } else {
            res.status(404).json({
                error: {
                    message: "User with id " + req.params.id + " not found"
                }
            });
        }
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(), username: req.body.username, login: req.body.login, password: hash
        });
        user.save().then((result) => {
            res.status(201).json({
                message: "Inserted user with id " + result._id, insertID: result._id
            });
        }).catch((err) => {
            res.status(422).json({
                error: err
            });
        });
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({login: req.body.login}).exec().then((doc) => {
        if (doc !== null) {
            bcrypt.compare(req.body.password, doc.password, (err, response) => {
                if (response) {
                    res.status(200).json({
                        message: "Login successful for user with id" + doc._id, userID: doc._id
                    });
                } else {
                    res.status(401).json({
                        message: "Password incorrect"
                    });
                }
            });
        } else {
            res.status(404).json({
                error: {
                    message: "User with login " + req.body.login + " not found"
                }
            });
        }
    });
});

router.delete('/:id', (req, res, next) => {
    User.deleteOne({_id: req.params.id}).exec().then((result) => {
        console.log(result)
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: "User deleted"
            });
        } else {
            res.status(404).json({
                message: "No user with id " + req.params.id
            });
        }
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;