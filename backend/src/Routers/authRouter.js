const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const validator =  require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);

        const { firstName, lastName, password, email,age,photoUrl,skills,Gender } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            age,
            photoUrl,
            skills,
            Gender,
        });
        await user.save();
        res.send("user saved to db");
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
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
            const token = await jwt.sign({_id: validUser._id}, "shrey999", { expiresIn: "1d" });

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Change to true in production (with HTTPS)
                sameSite: "lax"
            });
            
         res.status(200).send(validUser);
        } else {
            return res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        return res.status(400).send("Error:" + err.message);
    }
});
authRouter.post("/logout", async (req,res) => {
res.cookie("token", null);
res.send("Logged out"); 
})
module.exports = authRouter; 