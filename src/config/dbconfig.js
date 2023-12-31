const config = {
  // user: process.env.USER,
  // password: process.env.PASSWORD,
  // server: process.env.SERVER,
  // database: process.env.DATABASE,

  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: false
  }
};
// USER = "SharvayaFranchise";
// PASSWORD = "sharvaya@2024$";
// SERVER = "43.231.126.253";
// DATABASE = "SharvayaFranchise";
module.exports = config;
