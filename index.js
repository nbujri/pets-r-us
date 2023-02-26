// title: index.js
// author: ngi bujri
// date: february 4 2023
// description: express server

"use strict";

// imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");

// mongoose model imports
const Customer = require("./models/customer");
const Appointment = require("./models/appointment");

const app = express();

// path for views folder
app.set("views", path.join(__dirname, "views"));
// set view engine to ejs
app.set("view engine", "ejs");
// path for public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connection string for DB
const connection =
  "mongodb+srv://web340_admin:GMartinelli11@bellevueuniversity.hyveuqd.mongodb.net/web340DB";

// set strictQuery to true
mongoose.set("strictQuery", true);

// connect to MongoDB
mongoose
  .connect(connection)
  .then(() => {
    // if connection successful
    console.log("Connection to web340DB successful!");
  })
  .catch((error) => {
    console.log(error.message);
  });

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

// render registration page
app.get("/register", (req, res) => {
  res.render("register");
});

// post new user to DB
app.post("/register-user", (req, res, next) => {
  const newCustomer = new Customer({
    customerID: req.body.customerID,
    email: req.body.email,
  });

  Customer.create(newCustomer, (error, customer) => {
    if (error) {
      console.log(error);
      next(error);
    } else {
      res.redirect("/");
    }
  });
});

// render customer-list.ejs
app.get("/customer-list", (req, res) => {
  Customer.find({}, (error, customers) => {
    if (error) {
      console.log(error);
      next(error);
    } else {
      res.render("customer-list", { customers: customers });
    }
  });
});

// render appointment.ejs
app.get("/booking", (req, res) => {
  // get services.json and parse
  const file = fs.readFileSync("./public/data/services.json");
  const services = JSON.parse(file);

  res.render("booking", { services: services });
});

app.post("/book-appointment", (req, res, next) => {
  const booking = new Appointment({
    customerID: req.body.customerID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    service: req.body.service,
  });

  Appointment.create(booking, (error, newBooking) => {
    if (error) {
      console.log(error);
      next(error);
    } else {
      res.redirect("/");
    }
  });
});

// listen on port 3000
const port = process.env.port || 3000;
app.listen(port, () => console.info(`listening on port ${port}!`));
