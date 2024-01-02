const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/TodoController");

router.get("/tasks", TasksController.getAllTasksController);
router.post("/create", async (req, res) => {
    await TasksController.CreateTasksController(req, res);
});

router.post("/delete", async (req, res) => {
    await TasksController.deleteTaskController(req, res);
});

router.post("/edit", async (req, res) => {
    await TasksController.editTaskController(req, res);
});

module.exports = router;
