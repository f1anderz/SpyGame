const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,

});

module.exports =  mongoose.model('Game', gameSchema);