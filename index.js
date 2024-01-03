const express = require("express");
const app = express();
const port = 3000;
const router = require("./src/routes/TodoRoutes");
const cors = require('cors');
var bodyParser = require('body-parser')

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
