const express = require("express");
const Routes = require("./src/routes/TodoRoutes");
const app = express();
const port = 3000;

const config = {
  user: "SharvayaFranchise",
  password: "sharvaya@2024$",
  server: "43.231.126.253",
  database: "SharvayaFranchise",
  options: {
    encrypt: true
  }
};

app.use("/", Routes);

app.get("/", (req, res) => {
  res.send(config);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
