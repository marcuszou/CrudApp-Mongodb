import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("db connected");
    return;
  }
  if (mongoose.connection.length > 0) {
    connection.isConneted = mongoose.connection.readyState;
    if (connection.isConnected === 1) {
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL);
  connection.isConnected = db.connection.readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = flase;
    }
  }
}
const db = { connect, disconnect };
export default db;
