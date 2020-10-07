const express = require("express");
const app = express();
var cors = require('cors')
//one way---
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));


const Customer = require('./models/Customer');

app.use(cors())
// const uri = "mongodb+srv://team_1234:Abcd_1234@cluster0.pdoag.mongodb.net/paintingservice?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("paintingservice").collection("painting");
//   // perform actions on the collection object
//   console.log("connection created")
//   client.close();
// });
mongoose.connect("mongodb+srv://team_1234:Abcd_1234@cluster0.pdoag.mongodb.net/customerservice?retryWrites=true&w=majority", () => { console.log("coonnection creates") });

app.get('/findAll', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).send({
      message: customers
    })
  } catch (err) {
    res.status(400).send({
      message: "Error Occurred"
    })
  }
})

app.post('/add', async (req, res, next) => {
  console.log(req.body, "body")
  const { name, mobileNumber, address } = req.body;
  const customer = new Customer({
    name, mobileNumber, address
  });
  try {
    const custom = await Customer.find({ name: name, mobileNumber: mobileNumber, address: address });
    if (custom.length > 0 && res.statusCode==200) {
      res.status(200).send({
        message: custom[0]._id
      })
    }else{
    const newCustomer = await customer.save();
    console.log("customer",customer)
    res.status(200).send({
      message: newCustomer._id
    })
  }

  } catch (err) {
    res.status(400).send({
      message: "Error Occurred"
    })
  }
});
app.get('/search', async (req, res, next) => {
  try {
    console.log(req.query, "query")
    const customer = await Customer.find({ name: req.query.name, mobileNumber:req.query. mobileNumber, address: req.query.address });
    res.status(200).send({
      message: customer
    })
  } catch (err) {
    res.status(400).send({
      message: "Error Occurred"
    })
  }
})

app.get('/findOne', async (req, res, next) => {
  try {
    console.log(req.query, "query")
    const customer = await Customer.find({ _id: req.query.id });
    res.status(200).send({
      message: customer
    })
  } catch (err) {
    res.status(400).send({
      message: "Error Occurred"
    })
  }
})


app.listen(4001, () => {
  console.log("Up and Running! -- This is our Customer Service");
})