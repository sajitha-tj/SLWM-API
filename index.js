const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
// ==============================================
const UserRoute = require("./route/UserRoute");
const AdminRoute = require("./route/adminRoute");
// ==============================================
const app = express();
app.use(express.json({limit:"50mb"}));
app.use(cors());

const serverPort = process.env.SERVER_PORT;

mongoose.connect(
    "mongodb://localhost:27017/slwm"
).then(()=>{
    app.listen(serverPort, ()=>{
        console.log(`API server is Up and running on ${serverPort}`);
    })
}).catch(error => {
    console.log(error);
});

// ================================================

app.use('/api/v1/userRoute',UserRoute);
app.use('/api/v1/adminRoute',AdminRoute);