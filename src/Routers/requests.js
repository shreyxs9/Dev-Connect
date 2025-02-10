const express =require("express");
const auth = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRoute = express.Router(); 

requestRoute.post("/request/send/:status/:toUserId", auth, async (req,res) => {
try{
const fromUserId = req.user._id;
const toUserId = req.params.toUserId;
const status = req.params.status;

const validUser= await User.findById(toUserId); 
if(!validUser){
    return res.status(400).json({message:"User not found",});
}

const allowedStatusType = ['ignored', 'interested'];
if(!allowedStatusType.includes(status)){
return res.status(400).json({message:`invalid status ${status}`});
}

const existingRequest = await ConnectionRequest.findOne({
    $or:[
        {fromUserId, toUserId},
        {fromUserId:toUserId, toUserId:fromUserId},
    ],
});
if(existingRequest){
    return res.status(400).json({message:"Request already exists",});
}
const connectionRequest = new ConnectionRequest({
fromUserId,  
toUserId,
status,
});
const data = await connectionRequest.save();
res.json({message:"Request sent successfully", data});
} catch(err){
    res.status(400).send("Error:" + err.message);
}});

requestRoute.post("/request/review/:status/:requestId",auth , async (req,res) =>{
    try {
        const user = req.user;
     const {requestId,status} = req.params;
     const allowedStatusTypes = ["accepted", "rejected"];
     if(!allowedStatusTypes.includes(status)){
        throw new Error("invalid status type: " +status);
     }
     const validconnectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        status:"interested",
        toUserId:user._id
     });
     if(!validconnectionRequest){
        return res.status(400).json({message:"connection request not found"}); 
     }
    validconnectionRequest.status=status;
    const data=await validconnectionRequest.save();
    res.json({message:"connection request Success",data});
    } catch(err){
        res.status(400).send("Error :" + err.message);
    }
});

module.exports = requestRoute;