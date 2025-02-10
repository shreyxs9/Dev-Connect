 const mongoose = require('mongoose');

 const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
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

 const connectionRequestModel =  mongoose.model('ConnectionRequest', connectionRequestSchema);
    module.exports = connectionRequestModel;