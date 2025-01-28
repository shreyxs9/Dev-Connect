 const jwt = require("jsonwebtoken");
 const User = require("../models/user");

 const auth = async (req, res, next) => {
     try {
         const token = req.cookies.token;
         if(!token){
             throw new Error("Token is not present");}
         const decoded = await jwt.verify(token, "shrey999");
         const {_id} = decoded;
         const user = await User.findById(_id);
         if(!user){
                throw new Error("User not found");
         }
        res.send(user);
         next();
     } catch (err) {
         res.status(401).send("Please authenticate");
     }
 };
 module.exports=auth;