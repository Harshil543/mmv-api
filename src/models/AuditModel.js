const sequelize = require("../config/dbconfig");
const { Sequelize } = require("sequelize");

const getAllAuditActivity = async () => {
    try {
        const auditActivity = await sequelize.query(
            "SELECT * FROM SharvayaFranchise.dbo.AuditActivity ORDER BY pkID DESC",
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
        const employee = await sequelize.query(
            "SELECT pkID, EmployeeName FROM SharvayaFranchise.dbo.OrganizationEmployee;",
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
        const city = await sequelize.query(
            "SELECT CityCode, CityName FROM SharvayaFranchise.dbo.MST_City; ",
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
        return { auditActivity, customers, employee, city };
    } catch (err) {
        return err
    }
};

module.exports = { getAllAuditActivity }