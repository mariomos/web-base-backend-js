const express = require("express");
const mongoose = require("mongoose");
const API_KEY = "xDXqUUnTTF3YN5sf";
const productRoute = require("./routes/product.route.js");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoute);

//Endpoint test
app.get("/", function (req, res) {
  res.send("Hello from Node API.");
});

mongoose
  .connect(
    `mongodb+srv://mariomosx:${API_KEY}@backenddb.oiydo2o.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

module.exports = app;