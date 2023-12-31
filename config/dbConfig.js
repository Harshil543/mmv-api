const config = {
  user: process.env.USER_ID,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: false
  }
};

module.exports = config;
