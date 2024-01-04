const sequelize = require("../config/dbconfig");
const { Sequelize } = require("sequelize");

const getAllTask = async () => {
  try {
    const tasks = await sequelize.query(
      "SELECT * FROM SharvayaFranchise.dbo.TODO",
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );
    const employee = await sequelize.query(
      "SELECT ScreenFullName, EmployeeID FROM SharvayaFranchise.dbo.MST_Users",
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );
    return { tasks, employee };
  } catch (err) {
    return err
  }
};

const getAllOption = async () => {
  try {
    const Employee = await sequelize.query(
      "SELECT ScreenFullName, EmployeeID FROM SharvayaFranchise.dbo.MST_Users",
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );
    const TaskCategory = await sequelize.query(
      "SELECT pkID, TaskCategory FROM SharvayaFranchise.dbo.MST_TaskCategory",
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );
    return { Employee, TaskCategory };
  } catch (err) {
    return err
  }
};

const createTask = async (req, res) => {
  try {
    const {
      TaskDescription,
      TaskCategoryId,
      Location,
      Priority,
      StartDate,
      DueDate,
      DeliveryDate,
      CompletionDate,
      EmployeeID,
      Reminder,
      ReminderMonth,
      CreatedBy,
      UpdatedBy,
      Longitude,
      Latitude,
      ClosingRemarks,
      CustomerID,
      ActualDeliveryDate,
      CreatedDate, UpdatedDate,
    } = req.body;

    const [insertedRow, _] = await sequelize.query(
      `INSERT INTO SharvayaFranchise.dbo.TODO
            (TaskDescription, TaskCategoryId, Location, Priority, StartDate, DueDate, DeliveryDate, CompletionDate, EmployeeID, Reminder, ReminderMonth, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate, Longitude, Latitude, ClosingRemarks, CustomerID, ActualDeliveryDate)
            OUTPUT Inserted.pkID
            VALUES('${TaskDescription}', ${TaskCategoryId}, '${Location}', '${Priority}','${StartDate}', '${DueDate}', '${DeliveryDate}', '${CompletionDate}', ${EmployeeID}, ${Reminder}, ${ReminderMonth}, '${CreatedBy}','${CreatedDate}', '${UpdatedBy}', '${UpdatedDate}', '${Longitude}', '${Latitude}', '${ClosingRemarks}', ${CustomerID}, '${ActualDeliveryDate}');`,
      {
        type: Sequelize.QueryTypes.INSERT
      }
    );
    const insertedPkID = insertedRow[0].pkID;
    return insertedPkID
  } catch (err) {
    return err
  }
}

const deleteTask = async (req, res) => {
  try {
    const { ID } = req.body
    await sequelize.query(
      `DELETE FROM SharvayaFranchise.dbo.TODO
      WHERE pkID=${ID}`,
      {
        type: Sequelize.QueryTypes.DELETE
      }
    );
    return { status: "SUCCESS", message: "Task Deleted Successfully." };
  } catch (err) {
    return err
  }
};

const editTask = async (req, res) => {
  try {
    const {
      ID,
      TaskDescription,
      TaskCategoryId,
      Location,
      Priority,
      StartDate,
      DueDate,
      DeliveryDate,
      CompletionDate,
      EmployeeID,
      Reminder,
      ReminderMonth,
      CreatedBy,
      UpdatedBy,
      Longitude,
      Latitude,
      ClosingRemarks,
      UpdatedDate,
      CustomerID,
      ActualDeliveryDate } = req.body

    await sequelize.query(
      `UPDATE SharvayaFranchise.dbo.TODO
      SET TaskDescription='${TaskDescription}', TaskCategoryId=${TaskCategoryId}, Location='${Location}', Priority='${Priority}', StartDate='${StartDate}', DueDate='${DueDate}', DeliveryDate='${DeliveryDate}', CompletionDate='${CompletionDate}', EmployeeID=${EmployeeID}, Reminder=${Reminder}, ReminderMonth=${Reminder}, CreatedBy='${CreatedBy}', UpdatedBy='${UpdatedBy}', UpdatedDate='${UpdatedDate}', Longitude='${Longitude}', Latitude='${Latitude}', ClosingRemarks='${ClosingRemarks}', CustomerID=${CustomerID}, ActualDeliveryDate='${ActualDeliveryDate}'
      WHERE pkID=${ID}`,
      {
        type: Sequelize.QueryTypes.UPDATE
      }
    );
    return { status: "SUCCESS", message: "Task updated Successfully." };
  } catch (err) {
    return err
  }
};

module.exports = { getAllTask, createTask, deleteTask, editTask, getAllOption };
