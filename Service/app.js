const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
require("./db/conenction");

const fileUpload = require("express-fileupload");

app.use(cors());

app.use(bodyParser.json());

app.use(fileUpload());

app.use("/images", express.static(path.join(__dirname, "./public/images")));

app.get("/", (req, res) => res.send("API is running..."));

const route = require("./routes");

app.use("/attr", route);

app.post("/image", (req, res) => {
  let uploadFile;
  let uploadPath;

  console.log(req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  uploadFile = req.files.uploadFile;

  uploadPath = __dirname + '/uploads/' + uploadFile.name;

  uploadFile
  .mv(uploadPath, (err) => {
    if(err) {
        console.log(err);
        res.status(500).send(err);
    }
    else {
        res.json({
            msg: 'File uploaded',
            imageUrl : uploadPath
        })
    }
  })

  

});

module.exports = app;
