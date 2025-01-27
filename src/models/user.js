const mongoose = require('mongoose');
const validator =require('validator');

const userSchema =  new mongoose.Schema({ 
     firstName: {
        type:String,
        required: true,
        minLength:4,
        maxLength:20,
     },
     lastName :{
        type: String,
        required: true,
        minLength:4,
        maxLength:20,
     },
     email:{
        type:String,
        required: true,
        unique:true, 
        trim:true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid"+value);
            }
        }
     },
     password:{
        type:String,
        required: true,
     },  
     age:{
        type:String,
     },

});
 const userModel = mongoose.model('user', userSchema);
  module.exports = userModel;