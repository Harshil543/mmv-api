const { Sequelize } = require("sequelize");
const tedious = require("tedious");
const { DefaultAzureCredential } = require("@azure/identity");
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.SERVER,
    dialect: process.env.DIALECT,
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


module.exports = sequelize;
