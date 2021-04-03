const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    peoples: {
        type: [Schema.Types.ObjectId],
        required: false,
        default: []
    },
});
const Block = mongoose.model("Block", blockSchema);
module.exports = Block;
