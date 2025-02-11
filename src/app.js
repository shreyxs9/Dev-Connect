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
const userRouter = require('./Routers/user');

app.use("/",authRouter);
app.use("/", requestRoute);
app.use("/", profileRoute);
app.use("/", userRouter);




connectDb().then(() => {
    console.log("db connect");
    app.listen(3000, () => {
        console.log("running on 3000");
    });
}).catch((err) =>
    console.log("err is " + err)
);