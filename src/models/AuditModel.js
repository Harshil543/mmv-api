const sequelize = require("../config/dbconfig");
const { Sequelize } = require("sequelize");

const getAllAuditActivity = async () => {
    try {
        const auditActivity = await sequelize.query(
            "SELECT * FROM SharvayaFranchise.dbo.AuditActivity",
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
        const customers = await sequelize.query(
            "SELECT CustomerID, CustomerName, ContactNo1, CityCode, Area FROM SharvayaFranchise.dbo.MST_Customer",
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
        console.log(customers);
        const employee = await sequelize.query(
            "SELECT ScreenFullName, EmployeeID FROM SharvayaFranchise.dbo.MST_Users",
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
        // const city = await sequelize.query(
        //     "SELECT ScreenFullName, EmployeeID FROM SharvayaFranchise.dbo.MST_Users",
        //     {
        //         type: Sequelize.QueryTypes.SELECT
        //     }
        // );
        return { auditActivity, customers, employee };
    } catch (err) {
        return err
    }
};

module.exports = { getAllAuditActivity }