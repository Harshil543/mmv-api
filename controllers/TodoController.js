const { getAlltaskService } = require("../services/TodoServices");

const getAllTasksController = async (req, res) => {
  try {
    const TaskList = await getAlltaskService();
    res.json(TaskList);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getAllTasksController };
