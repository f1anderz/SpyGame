const express = require("express");
const router = express.Router();

const Location = require("../models/location");
const mongoose = require("mongoose");

router.get('/', (req, res, next) => {
    Location.find({}).exec().then((result) => {
        res.status(200).json({
            status: true,
            locations: result
        });
    }).catch((err) => {
        res.status(500).json({
            status: false,
            error: err
        });
    });
});

router.get('/:id', (req, res, next) => {
    Location.findOne({_id: req.params.id}).exec().then((result) => {
        if (result !== null) {
            res.status(200).json({
                status: true,
                location: result
            });
        } else {
            res.status(404).json({
                status: false,
                error: {
                    message: "Location with id " + req.params.id + " not found"
                }
            });
        }
    }).catch((err) => {
        res.status(500).json({
            status: false,
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const location = new Location({
        _id: new mongoose.Types.ObjectId(), name: req.body.name, image: req.body.image
    });
    location.save().then((result) => {
        res.status(201).json({
            status: true,
            insertID: result._id
        });
    }).catch((err) => {
        res.status(500).json({
            status: false,
            error: err
        });
    });
});

module.exports = router;