const sql = require("mssql");
// const config = require("../config/dbconfig");

const config = {
  user: "SharvayaFranchise",
  password: "sharvaya@2024$",
  server: "43.231.126.253",
  database: "SharvayaFranchise",
  options: {
    encrypt: true
  }
};

const getAllTask = async () => {
  const pool = await sql.connect(config);
  try {
    const result = await pool
      .request()
      .query("SELECT * FROM SharvayaFranchise.dbo.TODO");
    return result.recordset;
  } finally {
    sql.close();
  }
};

module.exports = { getAllTask };
