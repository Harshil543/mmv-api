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

        const DocData = await sequelize.query(
            `SELECT pkID, ModuleName, KeyValue, DocName
            FROM SharvayaFranchise.dbo.MST_Module_Documents`,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );

        const sectionWithScoreRating = await sequelize.query(
            "SELECT pkID, ParentID, CheckListID, AuditStatus, BaseRating, ScoreRating, Remarks FROM SharvayaFranchise.dbo.AuditActivity_Detail",
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
        console.log(DocData);
        return { auditActivity, customers, employee, city, sectionWithScoreRating, DocData };
    } catch (err) {
        return { status: 400 }
    }
};

const getSectionBaseRate = async () => {
    try {

        const section = await sequelize.query(
            "SELECT pkID, InquiryStatus, StatusCategory, CampaignID, DisplayOrder FROM SharvayaFranchise.dbo.MST_InquiryStatus WHERE StatusCategory='CheckList'",
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
        const sectionWithBaseRating = await sequelize.query(
            "SELECT pkID, CheckHead, CheckDesc, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate, ItemOrder, Description, HeadID, BaseRating FROM SharvayaFranchise.dbo.MST_CheckList",
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
        return { section, sectionWithBaseRating };
    } catch (err) {
        return { status: 400 }
    }

}

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

const FileUpload = async (req, res) => {
    try {
        const insertedRow = await sequelize.query(
            `INSERT INTO SharvayaFranchise.dbo.MST_Module_Documents (ModuleName, KeyValue, DocName, DocType, DocData, CreatedBy, CreatedDate) 
            VALUES('auditactivity',  '${req.body.KeyValue}', '${req.file.filename}', '', ${null}, 'admin', '${req.body.CreatedDate}')`,
            {
                type: Sequelize.QueryTypes.INSERT
            }
        );

        return insertedRow;
    } catch (err) {
        return { status: 400 }
    }

}

const FileDelete = async (req, res) => {
    try {
        const { ID } = req.body
        console.log(ID, "ID");
        const deleted = await sequelize.query(
            `DELETE FROM SharvayaFranchise.dbo.MST_Module_Documents WHERE pkID=${ID}`,
            {
                type: Sequelize.QueryTypes.DELETE
            }
        );
        return deleted;
    } catch (err) {
        return { status: 400 }
    }

}


module.exports = { getAllAuditActivity, editSectionRating, getSectionBaseRate, FileUpload, FileDelete }