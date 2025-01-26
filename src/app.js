const express = require('express');
const {auth} = require('./Middlewares/auth');
const app = express();  
const connectDb=require("./config/database")
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req,res) => {

    const user = new User(req.body);
    await user.save();
    res.send("user saved to db");
});
connectDb().then(()=>{
    console.log("db connect")
    app.listen(3000, () => {
        console.log("running on 3000");
    });  
}).catch((err) => 
    console.log("err is "+err));
