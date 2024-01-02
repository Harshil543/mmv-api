const { Sequelize } = require("sequelize");
const tedious = require("tedious");
const { DefaultAzureCredential } = require("@azure/identity");

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

console.log(sequelize);

module.exports = sequelize;
