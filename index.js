const express = require('express')
const app = express()
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://ahsan07:ahsan2003@cluster0.x1tvd1q.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>console.log("Db connection successful ")).catch((err)=>{
    console.log(err)
});

app.listen(5000, ()=>{
    console.log("backend server is running")

});
