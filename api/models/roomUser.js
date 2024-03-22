const mongoose = require("mongoose");

const roomUserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }, score: {
        type: Number, required: true
    }, suspectsLeft: {
        type: Number, required: true
    }, suspected: {
        type: Boolean, required: true
    }, voted: {
        type: Boolean, required: true
    }, votes: {
        type: Number, required: true
    }, kicked: {
        type: Boolean, required: true
    }, guessed: {
        type: Boolean, required: true
    }, isHost: {
        type: Boolean, required: false
    }
});

module.exports = mongoose.model('RoomUser', roomUserSchema);