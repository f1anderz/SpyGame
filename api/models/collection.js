const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,

});

module.exports =  mongoose.model('Collection', collectionSchema);