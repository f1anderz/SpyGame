const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    locationsCollection: {
        type: mongoose.Types.ObjectId,
        ref: "LocationsCollection",
        required: true
    }
});

module.exports = mongoose.model('Game', gameSchema);