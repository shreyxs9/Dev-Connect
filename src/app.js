const express = require('express');
const  auth = require('./Middlewares/auth');
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./Routers/authRouter");
const requestRoute = require("./Routers/requests");
const profileRoute = require("./Routers/profile");

app.use("/",authRouter);
app.use("/", requestRoute);
app.use("/", profileRoute);


app.get("/feed" , auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }
}); 

connectDb().then(() => {
    console.log("db connect");
    app.listen(3000, () => {
        console.log("running on 3000");
    });
}).catch((err) =>
    console.log("err is " + err)
);