const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ap: {
        type: String,
        required: true
    },
    block: {
        type: Object,
        required: true,
    }
}, {collection: 'People'});
module.exports = mongoose.model('People', peopleSchema);
