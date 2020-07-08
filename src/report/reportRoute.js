const express = require("express");
const route = express.Router();
const emailController = require("./reportController");


route.get("/emailDetails",emailController.generatePdf);





module.exports = route;
