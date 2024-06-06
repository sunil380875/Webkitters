import mongoose from "mongoose";
import { configs } from "../config";

class Database {
  constructor() {
    this.connect();
  }
  private connect(): void {
    mongoose.set("strictQuery", false);

    mongoose
      .connect(configs?.connectionDB)
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.log("Database connection error: ", err);
        process.exit(1);
      });
  }
}
export default Database;
