const { getAllOptionService, getAlltaskService, createTaskService, deleteTaskService, editTaskService } = require("../services/TodoServices");
const { response, badRequest } = require("../utils/helper");

const getAllTasksController = async (req, res) => {
  try {
    const TaskList = await getAlltaskService();
    if (TaskList.status === 400) {
      res.json({ ...badRequest });
    } else {
      res.json({ ...response, data: TaskList });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllOptionController = async (req, res) => {
  try {
    const TaskList = await getAllOptionService();
    if (TaskList.status === 400) {
      res.json({ ...badRequest });
    } else {
      res.json({ ...response, data: TaskList });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const CreateTasksController = async (req, res) => {
  try {

    const ID = await createTaskService(req, res);
    if (ID.status === 400) {
      res.json({ ...badRequest });
    } else {
      res.json({ ...response, message: "Task Created successfully", data: ID });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const ID = await deleteTaskService(req, res);
    if (ID.status === 400) {
      res.json({ ...badRequest });
    } else {
      res.json({ ...response, message: "Task Deleted successfully" });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const editTaskController = async (req, res) => {
  try {
    const ID = await editTaskService(req, res);
    if (ID.status === 400) {
      res.json({ ...badRequest });
    } else {
      res.json({ ...response, message: "Task updated successfully" });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getAllOptionController, getAllTasksController, CreateTasksController, deleteTaskController, editTaskController };
