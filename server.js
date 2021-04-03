// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');

// setup express
const app = express();
app.use(cors());
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => console.log('DB connected'))
    .catch(err => console.error(err));

// user routes
app.use("/people", require("./controllers/PeopleController"));
app.use("/block", require("./controllers/BlockController"));

app.listen(PORT);
console.log("Connected and listening at " + PORT);
