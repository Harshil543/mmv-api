const sql = require("mssql");
const sequelize = require("../config/dbconfig");
const { Sequelize } = require("sequelize");

const getAllTask = async () => {
  try {
    const tasks = await sequelize.query(
      "SELECT * FROM SharvayaFranchise.dbo.TODO",
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );
    return tasks;
  } catch (err) {
    console.log(err);
    return err
  }
};

module.exports = { getAllTask };
