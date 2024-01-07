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
        const section = await sequelize.query(
            "SELECT pkID, InquiryStatus, StatusCategory, CampaignID, DisplayOrder FROM SharvayaFranchise.dbo.MST_InquiryStatus WHERE StatusCategory='CheckList'",
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
        const sectionWithRating = await sequelize.query(
            "SELECT pkID, CheckHead, CheckDesc, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate, ItemOrder, Description, HeadID, BaseRating FROM SharvayaFranchise.dbo.MST_CheckList",
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
        return { auditActivity, customers, employee, city, section, sectionWithRating };
    } catch (err) {
        return { status: 400 }
    }
};


const editSectionRating = async (req, res) => {
    try {
        const {
            ParentId,
            CheckList
        } = req.body;

        CheckList.map(async (check) => {
            await sequelize.query(
                `UPDATE SharvayaFranchise.dbo.AuditActivity_Detail
                SET AuditStatus = ${check.AuditStatus}, ScoreRating = ${check.ScoreRating}, Remarks = '${check.Remark}'
                WHERE ParentId = ${ParentId} AND CheckListID = ${check.CheckListID};
                `,
                {
                    type: Sequelize.QueryTypes.UPDATE
                }
            )
        })

        return { status: "SUCCESS", message: "Audit updated Successfully." };
    } catch (err) {
        return { status: 400 }
    }
};

module.exports = { getAllAuditActivity, editSectionRating }