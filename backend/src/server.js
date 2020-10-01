const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/node-producthunt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", routes);

app.listen(3333, () => console.log("Server running"));
