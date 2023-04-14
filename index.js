const routes = require('./Routes/route');
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

const cors = require('cors');

const app = express();

// Middleware : built in middleware function in Express.
// It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
app.use(cors({
    origin: "https://fascinating-biscochitos-85aa80.netlify.app/"
}))

app.use('/api', routes);

//database.on means it will connect to the database, and throws any error if the connection fails.
database.on("error", (error) => {
    console.log(error);
});

//database.once means it will run only one time. 
//If it is successful, it will show a message that says Database Connected.
database.once('connected', () => {
    console.log('Database Connected');
})


app.listen(process.env.PORT || 8000);
