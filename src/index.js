const express = require("express");
const mongoose = require("mongoose");
let cors = require("cors")
require("dotenv").config();
const userRoutes = require("./routes/user");


const app = express();
const port = process.env.PORT || 8000;

app.use(cors())
//  middleware
app.use(express.json())
app.use("/api",userRoutes);

// routes
app.get("/", (req, res) =>{
    // res.send("Hola");
});

// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error(error));

app.listen(8000, () => console.log(`server listening on port`, port))