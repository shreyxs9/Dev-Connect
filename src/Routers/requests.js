const express =require("express");
const requestRoute = express.Router();

requestRoute.post("/", (req,res) => {
console.log("req is sent");
});


module.exports = requestRoute;