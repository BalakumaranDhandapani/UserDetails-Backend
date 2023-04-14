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
    origin: "http://localhost:3000"
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



// const userdetails = [];

// //to get and display all the users in db
// app.get("/users", async (req, res) => {
//     try {
//         //Steps for connecting DB With Nodejs Server
//         // 1. Connect MongoDB
//         const connection = await mongoclient.connect(URL);

//         // 2. Select Database
//         const db = connection.db("accounts");

//         // 3. Select Collection
//         const collection = db.collection("datas");

//         // 4. Do operation = CRUD(Insert, Find, update and Delete)
//         const users = await collection.find({}).toArray();

//         // 5. Close the connection once the operation is completed.
//         await connection.close();

//         res.json(users);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong. Please contact Administrator" });
//     }
// });

// //to create and add a new user in db
// app.post("/user", async (req, res) => {
//     try {
//         //Steps for connecting DB With Nodejs Server
//         // 1. Connect MongoDB
//         const connection = await mongoclient.connect(URL);

//         // 2. Select Database
//         const db = connection.db("accounts");

//         // 3. Select Collection
//         const collection = db.collection("datas");

//         // 4. Do operation = CRUD(Insert, Find, update and Delete)
//         const users = await collection.insertOne(req.body);

//         // 5. Close the connection once the operation is completed.
//         await connection.close();

//         res.json({ message: "User inserted successfully" });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong. Please contact Administrator" });
//     }
// });

// // to get the details of a particular user with id
// app.get("/user/:id", async (req, res) => {

//     try {
//         //Steps for connecting DB With Nodejs Server
//         // 1. Connect MongoDB
//         const connection = await mongoclient.connect(URL);

//         // 2. Select Database
//         const db = connection.db("accounts");

//         // 3. Select Collection
//         const collection = db.collection("datas");

//         // 4. Do operation = CRUD(Insert, Find, update and Delete)
//         const userdata = await collection.findOne({ "userid": req.params.id });
//         console.log(userdata);
//         // 5. Close the connection once the operation is completed.
//         await connection.close();

//         res.json({ data: userdata });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong. Please contact Administrator" });
//     }
// })

app.listen(process.env.PORT || 8000);
