const { getAllTask } = require("../model/TodoModel");

const getAlltaskService = async () => {
  return getAllTask();
};

module.exports = { getAlltaskService };
