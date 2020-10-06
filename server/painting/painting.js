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
    let paintingArray = []
    painting.forEach(element => {
      let data  = {};
      data.name = element.name;
      data.status = element.status;
      data._id = element._id;
      data.price = element.price;
      data.desc = element.desc;
      data.imgType = element.imgType;
      var b = Buffer.from(element.img, 'base64').toString('ascii')
      data.img = b
      paintingArray.push(data);
    });
    res.status(200).send({
      message: paintingArray
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
    const paint= await Painting.find({ name: name });
    if (paint.length > 0 && res.statusCode==200) {
      res.status(200).send({
        message:"Paintaing name not available! Please specify unique name"
      })
    }else{
    const newPainting = await painting.save();
    res.status(200).send({
      message: newPainting._id
    })
  }
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
