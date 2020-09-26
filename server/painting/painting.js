const express=require("express");
const app=express();
//one way---
// const MongoClient = require('mongodb').MongoClient;
const mongoose=require("mongoose");

// const uri = "mongodb+srv://team_1234:Abcd_1234@cluster0.pdoag.mongodb.net/paintingservice?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("paintingservice").collection("painting");
//   // perform actions on the collection object
//   console.log("connection created")
//   client.close();
// });
mongoose.connect("mongodb+srv://team_1234:Abcd_1234@cluster0.pdoag.mongodb.net/paintingservice?retryWrites=true&w=majority",()=>{console.log("coonnection creates")});
app.get('/',(req,res)=>{
    res.send("This is our Painting Service")
})
app.listen(4003,()=>{
    console.log("Up and Running! -- This is our Painting Service");
})