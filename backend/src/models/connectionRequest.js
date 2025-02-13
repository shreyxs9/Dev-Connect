 const mongoose = require('mongoose');

 const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    },
    toUserId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:['ignored','accepted','rejected','interested'],
            message:'{VALUE} is not supported'
        },
    },
    
 },{ timestamps: true });

connectionRequestSchema.index({fromUserId:1,toUserId:1});

 connectionRequestSchema.pre("save", function (next){
    connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send request to yourself");
    }
    next();
});
 const connectionRequestModel =  mongoose.model('ConnectionRequest', connectionRequestSchema);
    module.exports = connectionRequestModel;