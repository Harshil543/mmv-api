const sql = require("mssql");

const getAllTask = async () => {
  const pool = await sql.connect(require("../config/dbConfig"));
  try {
    const result = await pool
      .request()
      .query("SELECT * FROM SharvayaFranchise.dbo.TODO");
    console.log(result.recordset);
    return result.recordset;
  } finally {
    sql.close();
  }
};

module.exports = { getAllTask };
