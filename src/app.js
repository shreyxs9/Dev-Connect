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
app.get("/feed", async (req,res)=>{
     try{
        const users = await User.findOneAndDelete({email:"www.shryas.com"});
        res.send(users);
     } catch(err){ {
        res.semd("something went wrong");
     }
}})
app.get("/feed", async (req,res)=>{
     try{
        const users = await User.findOneAndDelete({email:"www.shryas.com"});
        res.send(users);
     } catch(err){ {
        res.semd("something went wrong");
     }
}})
app.patch("/feed", async (req,res)=>{
     try{
        const users = await User.updateMany({email:"www.shreyas.com"});
        res.send(users);
     } catch(err){ {
        res.semd("something went wrong");
     }
}})

connectDb().then(()=>{
    console.log("db connect")
    app.listen(3000, () => {
        console.log("running on 3000");
    });  
}).catch((err) => 
    console.log("err is "+err));
