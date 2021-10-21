//=========================
// DEPENDENCIS 
//========================
require("dotenv").config();
// pull PORT from .env, give default value of 4000
// pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

//=========================
// DATABASE CONNECTION
//========================
// ESTABLISH CONNECTION
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

//=========================
// MODELS
//========================
const DriverSchema = new mongoose.Schema({
    name: String, 
    image: String, 
    team: String, 
    rating: String, 
});

const Driver = mongoose.model("Driver", DriverSchema);

//=========================
// MIDDLEWARE
//========================
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); //logging
app.use(express.json()); //parse json bodies


//=========================
// ROUTES
//========================= 
//create a test route 
app.get("/", (req, res) => {
    res.send("hello world!");
});

// DRIVER INDEX ROUTE 
app.get("/driver" ,async (req, res) => {
    try { 
        // send all drivers
        res.json(await Driver.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// DRIVER CREATE ROUTE
app.post("/driver", async (req, res) => {
    try { 
        // send all driver
        res.json(await Driver.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
})

// DRIVER DELETE ROUTE 
app.delete("/driver/:id", async (req, res) => {
    try { 
        //send all drivers 
        res.json(await Driver.findByIdAndRemove(req.params.id));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
});

//DRIVER UPDATE ROUTE 
app.put("/driver/:id" , async (req, res) => {
    try { 
        //send all drivers 
        res.json( 
            await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true})
        );
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});
//=========================
// LISTENER
//========================
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
