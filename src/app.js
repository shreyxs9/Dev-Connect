const express = require('express');

const app =express();  

app.get("/hello",(req,res)=> {
    res.send("heloooo bkl's");
})
app.get("/hello/2",(req,res)=> {
    res.send("heloooo lause");
})
app.listen(3000, ()=>{
    console.log("running on 3000")
}  );