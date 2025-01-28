const express = require('express');
const { auth } = require('./Middlewares/auth');
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");
const bcrypt = require('bcrypt');
const validator =  require('validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);

        const { firstName, lastName, password, email,age } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            age,
        });
        await user.save();
        res.send("user saved to db");
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).send("Error: Email is not valid");
        }

        const validUser = await User.findOne({ email: email });
        if (!validUser) {
            return res.status(404).send("User not found");
        }

        const validCred = await bcrypt.compare(password, validUser.password);
        if (validCred) {
            const token = await jwt.sign({_id:validUser._id},  "shrey999");

            res.cookie("token", token);
            res.send("User logged in");
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }
});

app.get("/profile",  async (req,  res) => {
    try {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).send("invalid token");
    }
    const decodedmsg = await jwt.verify(token, "shrey999");
    const user = await User.findOne({_id: decodedmsg._id});
    if(!user){
        return res.status(404).send("user not found");
    }
 res.send("welcome "+ user.firstName);
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }
});


app.get("/feed", async (req, res) => {
    try {
        const users = await User.findOne({});
        res.send(users);
    } catch (err) {
        res.send("something went wrong");
    }
});
app.get("/feed", async (req, res) => {
    try {
        const users = await User.findOneAndDelete({ email: "www.shryas.com" });
        res.send(users);
    } catch (err) {
        res.send("something went wrong");
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
