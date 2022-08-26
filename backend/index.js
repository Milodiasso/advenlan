const express = require("express");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const mongoose = require('mongoose')
mongoose.pluralize(null)
const router = require("./routes/route")
const cors = require("cors")
require('dotenv').config();
const port = process.env.PORT;
const JWT_KEY = process.env.JWT_SECRET_KEY;

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://samongo:db_for_test_sam@databaseinfrankfurt.ocnnb.mongodb.net/Advenlan?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected mongodb server');
});

// mongoose.connect('mongodb://localhost:27017/advenlan', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log(`connected ${port} local`);
// });

app.use("/", router);
// const middlewareRoute = require('./middleware/middlewareRoute')
// app.use('/', middlewareRoute)

app.get("/", (req, res) => {
    res.send("Racine")
});

app.get("/about", (req, res) => {
    res.send("About")
});

app.listen(port, () => {
    console.log(`Le port est lancé sur ${port}`);
})


