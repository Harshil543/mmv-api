const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const port = 3000;
const tedious = require("tedious");

const sequelize = new Sequelize(
  "SharvayaFranchise",
  "SharvayaFranchise",
  "sharvaya@2024$",
  {
    host: "43.231.126.253",
    dialect: "mssql",
    dialectModule: tedious
  }
);

app.get("/", async (req, res) => {
  try {
    const tasks = await sequelize.query(
      "SELECT * FROM SharvayaFranchise.dbo.TODO",
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );
    res.json({ data: tasks });
  } catch (error) {
    console.error("Error fetching TODOs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
