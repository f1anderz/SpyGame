const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,

});

module.exports =  mongoose.model('Location', locationSchema);