const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const port = 3001;
const tedious = require("tedious");
const { DefaultAzureCredential } = require("@azure/identity");
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const sequelize = new Sequelize(
  "SharvayaFranchise",
  "SharvayaFranchise",
  "sharvaya@2024$",
  {
    host: "43.231.126.253",
    dialect: "mssql",
    dialectModule: tedious,
    authentication: {
      type: "azure-active-directory-access-token",
      options: {
        tokenFactory: async () => {
          const credential = new DefaultAzureCredential();
          const token = await credential.getToken(
            "https://database.windows.net/"
          );

          return token?.token || null;
        }
      }
    }
  }
);

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await sequelize.query(
      "SELECT * FROM SharvayaFranchise.dbo.TODO",
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );
    res.json({ data: tasks });
  } catch (error) {
    console.error("Error fetching TODOs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/Create", async (req, res) => {
  try {
    const {
      pkID,
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
      ActualDeliveryDate
    } = req.body;
    const currentDate = new Date();
    const date = currentDate.toISOString().replace("T", " ").slice(0, -1);

    await sequelize.query(
      `SET IDENTITY_INSERT SharvayaFranchise.dbo.TODO ON;

      INSERT INTO SharvayaFranchise.dbo.TODO
      (pkID, TaskDescription, TaskCategoryId, Location, Priority, StartDate, DueDate, DeliveryDate, CompletionDate, EmployeeID, Reminder, ReminderMonth, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate, Longitude, Latitude, ClosingRemarks, CustomerID, ActualDeliveryDate)
      VALUES(${pkID}, '${TaskDescription}', ${TaskCategoryId}, '${Location}', '${Priority}','${StartDate}', '${DueDate}', '${DeliveryDate}', '${CompletionDate}', ${EmployeeID}, ${Reminder}, ${ReminderMonth}, '${CreatedBy}','${date}', '${UpdatedBy}', '${date}', '${Longitude}', '${Latitude}', '${ClosingRemarks}', ${CustomerID}, '${ActualDeliveryDate}');
      
      SET IDENTITY_INSERT SharvayaFranchise.dbo.TODO OFF;
      `,
      {
        type: Sequelize.QueryTypes.INSERT
      }
    );

    res.json({ success: true, message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
