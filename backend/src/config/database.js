const mongoose = require('mongoose');

const connectDb = async () =>{
 await mongoose.connect("mongodb+srv://heartwise:@shreyas.nnpp8np.mongodb.net/dev-connect");
};

module.exports = connectDb;
