const express = require("express");
const auth = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const User = require("../models/user");

userRouter.get("/user/requests/received", auth , async (req, res) => {
try {
const user = req.user;

const connectionRequests = await ConnectionRequest.find({toUserId: user._id, status: "interested"}).populate("fromUserId",["firstName", "lastName", "age", "skills","gender","photoUrl"]);
res.json({message:"connection requests", 
    data: connectionRequests});
} catch(err) {
res.status(400).send("Error:" + err.message);
}
}); 

userRouter.get("/user/connections" , auth , async (req,res) => {

    try {
        const user = req.user;

        const connectionrequest = await ConnectionRequest.find({
            $or:[
                {toUserId: user._id, status: "accepted"},
                {fromUserId: user._id, status: "accepted"}
            ],
        }).populate("fromUserId",["firstName", "lastName", "age", "skills","gender", "photoUrl"]).populate("toUserId",["firstName", "lastName", "age", "skills","gender","photoUrl"]);

        const data = connectionrequest.map((key) => {
            if (key.fromUserId._id.toString() === user._id.toString()) {
                return { _id: key.toUserId._id, ...key.toUserId._doc };
            } else {
                return { _id: key.fromUserId._id, ...key.fromUserId._doc };
            }
        });
        
        res.json({message:"connections found", data});
    } catch(err) {
        res.status(400).send("Error:" + err.message );
    }
});

userRouter.get("/user/feed", auth, async (req,res)=>{
    try{
        const user = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 5 ;
        limit = limit >10 ? 10 :limit;
        let skip = (page-1)*limit;
        
        const connectionreq = await ConnectionRequest.find({
         $or :[
            {fromUserId: user._id},
            {toUserId: user._id},
         ],
        }).select("fromUserId toUserId");
        const hideUserFromFeed = new Set();
        connectionreq.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
         });

        const data = await User.find({
            $and:[
            {_id:{ $nin: Array.from(hideUserFromFeed)} },
            {_id:{ $ne: user._id}   },
    ],
        }).select("firstName lastName photoUrl age gender skills").skip(skip).limit(limit);
        res.json({message:"your home page", data: data});
    }catch (err) {
    res.status(400).send("Error:" + err.message)
    }
});

module.exports = userRouter; 