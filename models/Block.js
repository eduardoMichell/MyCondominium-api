const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    peoples: {
        type: [Object],
        required: false,
        default: []
    },
}, {collection: 'Block'});
module.exports = mongoose.model('Block', blockSchema);
