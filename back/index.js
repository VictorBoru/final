const express = require("express");
const app = express();
var cors = require("cors");
const questionsRoutes = require('./routes/questions');
const answersRoutes = require("./routes/answers");
const usersRoutes = require("./routes/users");

require("dotenv").config();

const mongoose = require("mongoose");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(questionsRoutes);
app.use(answersRoutes);
app.use(usersRoutes);

mongoose
    .connect(
        "mongodb+srv://borunovasviktoras:borunovas1@cluster0.60ilsjj.mongodb.net/stackoverflow?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("CONNECTED");
    })
    .catch((err) => {
        console.log("err", err);
    });

app.listen(8081, () => {
    console.log("Your app is alive!!!!!");
});