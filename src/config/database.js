const mongoose = require('mongoose');

const connectDb = async () =>{
 await mongoose.connect("mongodb+srv://heartwise:shreyaskumaR999$@shreyas.nnpp8np.mongodb.net/dev-connect");
};

module.exports = connectDb;