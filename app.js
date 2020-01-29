// Node Modules
const express = require("express");
const mongoose = require("mongoose");

// Create an Express instance
const app = express();

/**
 * Connects to a MongoDB defined in the .env file.
 * @function createDatabaseConnection
 * @return {Promise}
 */
const createDatabaseConnection = () => {
  const dbName = process.env.MONGO_DATABASE_NAME;
  const dbAddress = process.env.MONGO_DATABASE_ADDRESS;
  const dbUsername = process.env.MONGO_DATABASE_USERNAME;
  const dbPassword = process.env.MONGO_DATABASE_PASSWORD;
  const mongoDbUrl = `mongodb://${dbUsername}:${dbPassword}@${dbAddress}/${dbName}`;
  const options = { useNewUrlParser: true };
  return mongoose.connect(mongoDbUrl, options);
};

// Mongoose Stuff

//Set up default mongoose connection
var mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Define a schema
var Schema = mongoose.Schema;

var LupanSchema = new Schema({
  level: {
    type: Number
  },
  race: {
    type: String,
    enum: ["Big", "Med", "Small"]
  }
});
