const { getAllAuditActivityService, editSectionRatingService, SectionRatingService, FileService } = require("../services/AuditServies");
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
const getAllAuditServiceController = async (req, res) => {
    try {
        const AuditList = await SectionRatingService();
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

const FileController = async (req, res) => {
    try {
        const AuditList = await FileService(req, res);
        console.log(AuditList);
        if (AuditList.status === 400) {
            res.json({ ...badRequest });
        } else {
            res.status(200).json({
                message: 'File uploaded successfully'
            });
        }
    } catch (error) {
        console.log(error);;
    }
};


module.exports = { getAllAuditController, editSectionRatingController, getAllAuditServiceController, FileController }