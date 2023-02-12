/*
title: customer.js
author: ngi bujri
date: february 11 2023
description: customer model
*/

"use strict";

const mongoose = require("mongoose");

let Customer = new mongoose.Schema({
  customerID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Customer", Customer);
