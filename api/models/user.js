const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    login: String,
    password: String
});

module.exports =  mongoose.model('User', userSchema);