const express = require('express');

const app =express();  
app.use((req,res)=> {
    res.send("heloooo bkl's");
})
app.listen(3000, ()=>{
    console.log("running on 3000")
}  );