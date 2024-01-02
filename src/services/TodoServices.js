const { getAllTask, createTask, deleteTask, editTask } = require("../models/TodoModel");

const getAlltaskService = async () => {
  const data = await getAllTask();
  return data;
};

const createTaskService = async (req, res) => {
  const ID = await createTask(req, res);
  return ID;
};

const deleteTaskService = async (req, res) => {
  const data = await deleteTask(req, res);
  return data;
};

const editTaskService = async (req, res) => {
  const data = await editTask(req, res);
  return data;
};


module.exports = { getAlltaskService, createTaskService, deleteTaskService, editTaskService };
