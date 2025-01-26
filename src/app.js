const express = require('express');
const {auth} = require('./Middlewares/auth');
const app = express();  

app.use("/admin",auth );

app.get("/admin/getAll", (req, res) => {
    res.send("all data sent");
});

app.listen(3000, () => {
    console.log("running on 3000");
});