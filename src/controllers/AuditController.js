const { getAllAuditActivityService, editSectionRatingService } = require("../services/AuditServies");
const { response, badRequest } = require("../utils/helper");

const getAllAuditController = async (req, res) => {
    try {
        const AuditList = await getAllAuditActivityService();
        if (AuditList.status === 400) {
            res.json({ ...badRequest });
        } else {
            res.json({ ...response, data: AuditList });
        }

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

const editSectionRatingController = async (req, res) => {
    try {
        const AuditList = await editSectionRatingService(req, res);
        if (AuditList.status === 400) {
            res.json({ ...badRequest });
        } else {
            res.json({ ...response, message: "Audit updated Successfully." });
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { getAllAuditController, editSectionRatingController }