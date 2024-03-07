const mongoose = require("mongoose");

const collectionSuggestionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    }]
});

module.exports = mongoose.model('LocationsCollectionSuggestion', collectionSuggestionSchema);