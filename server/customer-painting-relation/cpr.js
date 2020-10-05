const express=require("express");
const app=express();
var cors = require('cors')
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '5mb' }));
app.use(cors());
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
mongoose.connect("mongodb+srv://team_1234:Abcd_1234@cluster0.pdoag.mongodb.net/customer_painting_relation_service?retryWrites=true&w=majority",()=>{console.log("coonnection creates")});
const Relation= require('./models/Cpr');

app.post('/add', async (req, res, next) => {
    console.log(req.body, "body")
    const { paintingId,customerId,relation } = req.body;
    const relation = new Relation({
      customerId,paintingId,relation
    });
    try {
   
      const newRelation = await relation.save();
     
      res.status(200).send({
        message: newRelation
      })
    
  
    } catch (err) {
      res.status(400).send({
        message: "Error Occurred"
      })
    }
  });
  app.get('/findWithCid', async (req, res, next) => {
    try {
      console.log(req.query, "query")
      const relation= await Relation.find({ customerId: req.query.customerId });
      res.status(200).send({
        message:relation
      })
    } catch (err) {
      res.status(400).send({
        message: "Error Occurred"
      })
    }
  })
  app.get('/findWithPid', async (req, res, next) => {
    try {
      console.log(req.query, "query")
      const relation = await Relation.find({ paintingId: req.query.paintingId });
      res.status(200).send({
        message: relation
      })
    } catch (err) {
      res.status(400).send({
        message: "Error Occurred"
      })
    }
  })

app.listen(4002,()=>{
    console.log("Up and Running! -- This is our Customer-Painting-Relation Service");
})