const express = require("express");
const router = express.Router();

const LocationsCollection = require("../models/locationsCollection");
const LocationsCollectionSuggestion = require("../models/locationsCollectionSuggestion");
const mongoose = require("mongoose");

router.get('/', (req, res, next) => {
    LocationsCollection.find({}).populate('locations').exec().then((result) => {
        res.status(200).json({
            message: "Fetched all Locations Collections", locationsCollection: result
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:id', (req, res, next) => {
    LocationsCollection.find({_id: req.params.id}).populate('locations').exec().then((result) => {
        if (result !== null) {
            res.status(200).json({
                message: "Fetched Locations Collection with id " + req.params.id, locationsCollection: result
            });
        } else {
            res.status(404).json({
                error: {
                    message: "Locations Collection with id " + req.params.id + " not found"
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
    const locationsCollectionSuggestion = new LocationsCollectionSuggestion({
        _id: new mongoose.Types.ObjectId(), name: req.body.collectionName, locations: req.body.locations
    });
    locationsCollectionSuggestion.save().then((result) => {
        res.status(201).json({
            message: "Inserted Locations Collection with id " + result._id, insertID: result._id
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/add', (req, res, next) => {
    const locationsCollection = new LocationsCollection({
        _id: new mongoose.Types.ObjectId(), name: req.body.name
    });
    locationsCollection.save().then((result) => {
        res.status(201).json({
            message: "Inserted Locations Collection with id " + result._id, insertID: result._id
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:id', (req, res, next) => {
    let locationsCollection = {};
    LocationsCollection.findOne({_id: req.params.id}).exec().then((result) => {
        if (result !== null) {
            locationsCollection = result;
            locationsCollection.locations.push(req.body.locationID);
            locationsCollection.save().then((result) => {
                res.status(200).json({
                    message: "Location with id " + req.body.locationID + " was added to Locations Collection with id " + req.params.id
                });
            }).catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
        } else {
            res.status(404).json({
                error: {
                    message: "Locations Collection with id " + req.params.id + " not found"
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