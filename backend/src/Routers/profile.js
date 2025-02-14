const express = require('express');
const profileRoute = express.Router();
const auth = require('../Middlewares/auth');
const  {validateProfileEditData, validatePassword}  = require('../utils/validation');
const bcrypt = require('bcrypt');


profileRoute.get("/profile", auth, async (req, res) => {
    try { 
        const user = req.user;
        if (!user || typeof user.firstName !== 'string') {
            throw new Error("User or user.firstName is undefined or not a string");
        }
        res.json({message:"welcome " + user.firstName, data:user});
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }
});

profileRoute.patch("/profile/edit", auth, async (req, res) => {
    try {
        if (!validateProfileEditData(req)) {
            throw new Error("Invalid data");
        }
        const user = req.user;
        Object.keys(req.body).forEach(key => {
            user[key] = req.body[key];
        });
       await user.save();
        res.json({
            message:`${user.firstName},Your Profile has been successfully updated`,
        data: user});
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }
}); 

profileRoute.patch("/profile/forgotpassword", auth , async (req, res) => {
    try {
        if(validatePassword(req)){
            throw new error("password is not valid!");
        }
        const user = req.user;
        const { currentPassword, newPassword , reEnterNewPassword} = req.body;
        if(newPassword !== reEnterNewPassword){
            throw new Error("Password does not match");
        }
        const validCredentials = await bcrypt.compare(currentPassword, user.password);
        if (!validCredentials) {
            throw new Error("Invalid Password");
        }
        user.password = await bcrypt.hash(newPassword, 8);
        await user.save();

        res.send(`${user.firstName}, Your Password has been successfully updated`);
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }
});

module.exports = profileRoute;