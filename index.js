const express = require("express");
const sql = require("mssql");
const app = express();
const port = 3000;

const config = {
  user: "SharvayaFranchise",
  password: "sharvaya@2024$",
  server: "43.231.126.253",
  database: "SharvayaFranchise",
  options: {
    encrypt: false
  }
};

app.get("/", async () => {
  const pool = await sql.connect(config);
  console.log(pool);
  try {
    const result = await pool
      .request()
      .query("SELECT * FROM SharvayaFranchise.dbo.TODO");
    return result.recordset;
  } finally {
    sql.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
