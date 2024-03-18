const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "RoomUser"
    }],
    currentGame: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    },
    password:{
        type: mongoose.Schema.Types.String,
        required: true
    }
});

module.exports = mongoose.model('Room', roomSchema);