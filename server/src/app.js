const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clientRoutes");
const devRoutes = require("./routes/devRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/clients/", clientRoutes);
app.use("/devs/", devRoutes);
app.use("/services/", serviceRoutes);

module.exports = app;
