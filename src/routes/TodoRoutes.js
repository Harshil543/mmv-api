const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/TodoController");

router.get("/", (req, res) => {
    res.json("Hello API..!")
});

router.get("/tasks", TasksController.getAllTasksController);
router.get("/options", TasksController.getAllOptionController);
router.post("/create", async (req, res) => {
    await TasksController.CreateTasksController(req, res);
});

router.post("/delete", async (req, res) => {
    await TasksController.deleteTaskController(req, res);
});

router.post("/edit", async (req, res) => {
    await TasksController.editTaskController(req, res);
});

router.use((req, res) => {
    res.status(404).json("Page Not Found");
});


module.exports = router;
