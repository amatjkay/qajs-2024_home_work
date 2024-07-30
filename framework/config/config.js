require("dotenv").config();

const config = {
  baseUrl: process.env.BASE_URL,
  login: process.env.LOGIN,
  password: process.env.PASSWORD,
};

module.exports = config;
