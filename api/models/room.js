const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "RoomUser"
    }],
    host:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
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