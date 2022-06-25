import mongoose from "mongoose";
import { app } from "./app";

const authPort = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Conntected to db!");
  } catch (err) {
    console.error(err);
  }
};

app.listen(authPort, () => {
  console.log(`Listening on port ${authPort}!!!`);
});

start();
