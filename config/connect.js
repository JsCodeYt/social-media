const mongoose = require("mongoose");

const connect = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => {
      console.log("db active ...");
    })
    .catch((err) => {
      console.log("mongo error !");
    });
};


module.exports = connect
