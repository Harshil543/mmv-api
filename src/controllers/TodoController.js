const { getAlltaskService } = require("../services/TodoServices");

const { response } = require("../utils/helper");
console.log(response);
const getAllTasksController = async (req, res) => {
  try {
    const TaskList = await getAlltaskService();
    res.json({ ...response, data: TaskList });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getAllTasksController };
