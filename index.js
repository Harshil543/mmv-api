const express = require("express");
const sql = require("mssql");
const dbConfig = require("./config/dbConfig.js");
const Routes = require("./routes/TodoRoutes.js");

const app = express();
const port = 3000;
const pool = new sql.ConnectionPool(dbConfig);

app.use("/", Routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
