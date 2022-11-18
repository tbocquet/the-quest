const express = require("express");

const lolRoutes = require("./routes/lol");
//const path = require("path");

var cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/*Rendre accessibles les images du dossier images*/
//app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/lol", lolRoutes);

module.exports = app;
