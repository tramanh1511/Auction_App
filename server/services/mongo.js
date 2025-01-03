const mongoose = require("mongoose");

require("dotenv").config();

// Update below to match your own MongoDB connection string.
const MONGO_URL =
  // "mongodb+srv://ramseytrinh:MkhjDo5WemtDgYFi@cluster0.xaaktog.mongodb.net/auction_app";
  "mongodb+srv://root:123@cluster0.wdeyh.mongodb.net/test"

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
