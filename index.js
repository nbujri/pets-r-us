// title: index.js
// author: ngi bujri
// date: february 4 2023
// description: express server

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

// render landing page
app.get("/", (req, res) => {
  res.render("index");
});

// render grooming page
app.get("/grooming", (req, res) => {
  res.render("grooming");
});

// render training page
app.get("/training", (req, res) => {
  res.render("training");
});

// render boarding page
app.get("/boarding", (req, res) => {
  res.render("boarding");
});

// listen on port 3000
const port = process.env.port || 3000;
app.listen(port, () => console.info(`listening on port ${port}!`));
