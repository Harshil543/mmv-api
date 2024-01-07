const { getAllOption, getAllTask, createTask, deleteTask, editTask } = require("../models/TodoModel");

const getAlltaskService = async () => {
  const data = await getAllTask();

  const resultObject = {};

  data.TaskSharingEmployee.forEach(item => {
    const { Module, ParentID, EmployeeID } = item;

    if (!resultObject[ParentID]) {
      resultObject[ParentID] = { Module, ParentID, EmployeeID: [EmployeeID] };
    } else {
      resultObject[ParentID].EmployeeID.push(EmployeeID);
    }
  });

  const resultArray = Object.values(resultObject);
  const tasksWithEmployeeNames = data.tasks.map(task => {
    const MultiAssignEmp = resultArray.find(emp => emp.ParentID === task.pkID)
    const employee = data.employee.find(emp => emp.pkID === task.EmployeeID);
    return {
      ...task,
      EmployeeName: employee ? employee.EmployeeName : "Unknown Employee",
      MultiAssignEmp: MultiAssignEmp ? MultiAssignEmp.EmployeeID : []
    };
  });
  return tasksWithEmployeeNames;
};

const getAllOptionService = async () => {
  const data = await getAllOption();
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


module.exports = { getAlltaskService, createTaskService, deleteTaskService, editTaskService, getAllOptionService };
