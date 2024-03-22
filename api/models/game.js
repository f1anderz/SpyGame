const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    }, spy: {
        type: mongoose.Schema.Types.ObjectId, ref: "RoomUser", required: true
    }, users: [{
        type: mongoose.Schema.Types.ObjectId, ref: "RoomUser", required: true
    }], locationsCollection: {
        type: mongoose.Schema.Types.ObjectId, ref: "LocationsCollection", required: true
    }, featuredLocation: {
        type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true
    }, endless: {
        type: mongoose.Schema.Types.Boolean, required: true
    }, roundTime: {
        type: mongoose.Schema.Types.String, required: false
    }, roundStartTime: {
        type: mongoose.Schema.Types.String, required: false
    }, winners: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'RoomUser', required: false
    }],

});

module.exports = mongoose.model('Game', gameSchema);