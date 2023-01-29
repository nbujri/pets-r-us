"use strict";

// imports
const express = require("express");
const path = require("path");

const app = express();

// path for views folder
app.set("views", path.join(__dirname, "views"));
// set view engine to ejs
app.set("view engine", "ejs");
// path for public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/grooming", (req, res) => {
  res.render("grooming");
});

const port = process.env.port || 3000;
app.listen(port, () => console.info(`listening on port ${port}!`));
