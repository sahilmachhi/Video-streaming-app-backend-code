import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
    try {
        const databaseInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(databaseInstance.connection.host)
        return databaseInstance
    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
}