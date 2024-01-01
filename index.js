const express = require("express");
// const Routes = require("./src/routes/TodoRoutes");
// const config = require("./src/config/dbconfig");
// console.log(config);
const app = express();
const sql = require("mssql");
const port = 3000;
const config = {
  user: "SharvayaFranchise",
  password: "sharvaya@2024$",
  server: "43.231.126.253",
  database: "SharvayaFranchise",
  trustServerCertificate: true,
  options: {
    encrypt: true,
    cryptoCredentialsDetails: {
      minVersion: "TLSv1"
    }
  }
};
// app.use("/", Routes);

app.get("/", async (req, res) => {
  const pool = await sql.connect(config);
  try {
    const result = await pool
      .request()
      .query("SELECT * FROM SharvayaFranchise.dbo.TODO");
    res.json({ data: result.recordset });
  } finally {
    sql.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// const sql = require("mssql");

// const config = {
//   user: "SharvayaFranchise",
//   password: "sharvaya@2024$",
//   server: "43.231.126.253",
//   database: "SharvayaFranchise",
//   authentication: {
//     type: "default"
//   },
//   trustServerCertificate: true,
//   options: {
//     encrypt: true,
//     cryptoCredentialsDetails: {
//       minVersion: "TLSv1",
//       trustServerCertificate: true
//     }
//   }
// };

/*
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-vm'
        },
        options: {
            encrypt: true
        }
    }

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-app-service'
        },
        options: {
            encrypt: true
        }
    }
*/

// console.log("Starting...");
// connectAndQuery();

// async function connectAndQuery() {
//   try {
//     var poolConnection = await sql.connect(config);

//     console.log("Reading rows from the Table...");
//     var resultSet = await poolConnection
//       .request()
//       .query(`SELECT * FROM SharvayaFranchise.dbo.TODO`);

//     console.log(`${resultSet.recordset.length} rows returned.`);

//     var columns = "";
//     for (var column in resultSet.recordset.columns) {
//       columns += column + ", ";
//     }
//     console.log("%s\t", columns.substring(0, columns.length - 2));

//     resultSet.recordset.forEach((row) => {
//       console.log("%s\t%s", row.CategoryName, row.ProductName);
//     });

//     poolConnection.close();
//   } catch (err) {
//     console.error(err.message);
//   }
// }
