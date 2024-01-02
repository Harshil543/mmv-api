const express = require("express");
const app = express();
// const sequelize = require("./src/config/dbconfig");
const port = 3000;
// const { Sequelize } = require("sequelize");
const router = require("./src/routes/TodoRoutes");


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
