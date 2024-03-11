const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    spy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomUser",
        required: true
    },
    locationsCollection: {
        type: mongoose.Types.ObjectId,
        ref: "LocationsCollection",
        required: true
    },
    featuredLocation: {
        type: mongoose.Types.ObjectId,
        ref: "Location",
        required: true
    }
});

module.exports = mongoose.model('Game', gameSchema);