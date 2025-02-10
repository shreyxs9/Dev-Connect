const express = require("express");
const auth = require("../Middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/received", auth , async (req, res) => {
try {
const user = req.user;

const connectionRequests = await connectionRequest.find({toUserId: user._id, status: "interested"}).populate("fromUserId",["firstName", "lastName"]);
res.json({message:"connection requests", 
    data: connectionRequests});
} catch(err) {
res.status(400).send("Error:" + err.message);
}
}); 

userRouter.get("/user/connections" , auth , async (req,res) => {

    try {
        const user = req.user;

        const connectionrequest = await connectionRequest.find({
            $or:[
                {toUserId: user._id, status: "accepted"},
                {fromUserId: user._id, status: "accepted"}
            ],
        }).populate("fromUserId",["firstName", "lastName"]).populate("toUserId",["firstName", "lastName"]);

        const data = connectionrequest.map((key)=> {
            if(key.fromUserId._id.toString() === user._id.toString()) {
              return  key.toUserId
            } else {
                return key.fromUserId;
            }
       });
        res.json({message:"connections found", data});
    } catch(err) {
        res.status(400).send("Error:" + err.message );
    }
});
module.exports = userRouter; 