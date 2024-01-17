const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/TodoController");
const AuditController = require("../controllers/AuditController");
const path = require('path');
const fs = require('fs/promises');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: "E:/MMV/moduledocs",
    filename: (req, file, cb) => {
        cb(null, `auditactivity-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    res.json("Hello API..!")
});

router.get("/tasks", TasksController.getAllTasksController);

router.get("/options", TasksController.getAllOptionController);

router.get("/audit-activity", AuditController.getAllAuditController);
router.get("/audit-section", AuditController.getAllAuditServiceController);
router.post("/edit-audit-activity", async (req, res) => { await AuditController.editSectionRatingController(req, res) });

router.post("/create", async (req, res) => {
    await TasksController.CreateTasksController(req, res);
});

router.post("/delete", async (req, res) => {
    await TasksController.deleteTaskController(req, res);
});

router.post("/edit", async (req, res) => {
    await TasksController.editTaskController(req, res);
});

router.post("/upload", upload.single('file'), async (req, res) => {
    try {
        if (req.file) {
            await AuditController.FileController(req, res);
            const sourcePath = req.file.path;
            const destinationPath = path.join("E:/MMV/moduledocs", req.file.filename);
            await fs.rename(sourcePath, destinationPath);
            const filePath = `moduledocs/${req.file.filename}`;
        } else {
            return res.status(400).json({ message: 'No file uploaded' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/deleteFile/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filePath = `E:/MMV/moduledocs/${filename}`;
    try {
        await AuditController.FileDeleteController(req, res);
        await fs.access(filePath, fs.constants.F_OK);
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).send(`File "${filename}" not found.`);
        } else {
            res.status(500).send(`Error deleting file "${filename}": ${error.message}`);
        }
    }
});

router.use((req, res) => {
    res.status(404).json("Page Not Found");
});


module.exports = router;
