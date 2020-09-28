const express = require("express");
const app = express();
var cors = require('cors')

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Painting = require('./models/Painting');

mongoose.connect("mongodb+srv://team_1234:Abcd_1234@cluster0.pdoag.mongodb.net/paintingservice?retryWrites=true&w=majority", () => { console.log("coonnection creates") });

const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(cors())

app.get('/findAll', async (req, res) => {
  try {
    const painting = await Painting.find();
    res.status(200).send({
      message: painting
    })
  } catch (err) {
    res.status(400).send({
      message: "Error Occurred"
    })
  }
})

app.post('/add', async (req, res, next) => {
  const { name, price, img, status, desc, imgType } = req.body;
  const painting = new Painting({
    name, price, status, desc, img, imgType
  });
  try {
    const newPainting = await painting.save();
    res.status(200).send({
      message: "Saved Successfully!"
    })
  } catch (err) {
    res.status(400).send({
      message: "Error Occurred"
    })
  }
});

app.put('/updateStatus', async (req, res, next) => {
  try {
    const newPainting = await Painting.findOneAndUpdate({
      _id : req.body._id
    },{
      $set : {
        status : true
      }
    });
    res.status(200).send({
      message: "Updated Successfully!"
    })
  } catch (err) {
    res.status(400).send({
      message: "Error Occurred"
    })
  }
})


app.listen(4003, () => {
  console.log("Up and Running! -- This is our Painting Service");
})
