const { getAllAuditActivityService } = require("../services/AuditServies");
const { response } = require("../utils/helper");

const getAllAuditController = async (req, res) => {
    try {
        const AuditList = await getAllAuditActivityService();
        res.json({ ...response, data: AuditList });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { getAllAuditController }