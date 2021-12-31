const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/inputAttribute";
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));