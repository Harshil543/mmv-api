const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const dbConfig = require("../config/dbConfig");

const response = {
  status: "success",
  code: 200,
  message: "successfully."
};

router.get("/", async (req, res) => {
  try {
    await mssql.connect(dbConfig);
    const result = await mssql.query(
      "SELECT * FROM SharvayaFranchise.dbo.TODO"
    );
    res.json({
      ...response,
      data: result.recordset
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  } finally {
    mssql.close();
  }
});

module.exports = router;
