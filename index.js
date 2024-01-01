const express = require("express");
// const Routes = require("./src/routes/TodoRoutes");
const config = require("./src/config/dbconfig");
console.log(config);
const app = express();
const port = 3000;

// app.use("/", Routes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
