// src/utils/helper.js

const response = {
  status: "success",
  code: 200,
  message: "successfully."
};

const badRequest = {
  status: "success",
  code: 400,
  message: "something went wrong."
};

module.exports = {
  response, badRequest
};
