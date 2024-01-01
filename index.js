const express = require("express");
// const Routes = require("./src/routes/TodoRoutes");
// const config = require("./src/config/dbconfig");
// console.log(config);
const app = express();
const sql = require("mssql");
const port = 3000;
const config = {
  user: "SharvayaFranchise",
  password: "sharvaya@2024$",
  server: "43.231.126.253",
  database: "SharvayaFranchise",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};
// app.use("/", Routes);

app.get("/", async (req, res) => {
  const pool = await sql.connect(config);
  try {
    const result = await pool
      .request()
      .query("SELECT * FROM SharvayaFranchise.dbo.TODO");
    res.json({ data: result.recordset });
  } finally {
    sql.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
