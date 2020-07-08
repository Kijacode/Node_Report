const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const emailDetails = require("./src/report/reportRoute");

// const app2 = require("./DistributeSongs/distribute");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);


app.use(express.json());
// rateScheduler;
app.use(cors());
// app.use("/",app2);
app.use("/api/user", emailDetails);


module.exports = app;