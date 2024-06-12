import mongoose, { ConnectionStates } from "mongoose";
const bcrypt = require('bcrypt');
const saltRounds = 10;

interface Connection {
    isConnected: boolean;
    con: ConnectionStates | null;
}

const connection: Connection = {
    isConnected: false,
    con: null,
};

export const connectMongo = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO!);
        connection.isConnected = true;
        connection.con = db.connections[0].readyState;
      } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        throw new Error("Error connecting to MongoDB");
      }
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}