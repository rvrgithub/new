const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "../configs/config.env" });
const connect = () => {
  mongoose
    .connect(process.env.MONGOOSE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("connection is successfull");
    })
    .catch((err) => {
      console.log("No connection", err);
    });
};
module.exports = connect;
