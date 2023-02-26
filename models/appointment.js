/*
title: appointment.js
author: ngi bujri
date: february 26 2023
description: appointment model
*/

"use strict";

const mongoose = require("mongoose");

const appointment = new mongoose.Schema({
  customerID: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  service: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointment);
