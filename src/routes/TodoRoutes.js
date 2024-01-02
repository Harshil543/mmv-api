const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/TodoController");

router.get("/tasks", TasksController.getAllTasksController);

module.exports = router;
