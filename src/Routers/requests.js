const express =require("express");
const auth = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const requestRoute = express.Router();

requestRoute.post("/request/send/:status/:toUserId", auth, async (req,res) => {
try{
const fromUserId = req.user._id;
const toUserId = req.params.toUserId;
const status = req.params.status;
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


module.exports = requestRoute;