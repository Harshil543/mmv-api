const { getAllTask } = require("../models/TodoModel");

const getAlltaskService = async () => {
  const data = await getAllTask();
  return data;
};

module.exports = { getAlltaskService };
