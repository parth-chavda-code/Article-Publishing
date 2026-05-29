import express from "express";
import { connectDb } from "./config/db.js";
import { app } from "./app.js";

const server = express();

const startServer = async () => {
    try {
        await connectDb();
        server.listen(4000, () => {
            console.log("Server is listening on port 4000");
        });
    } catch (error) {
        console.log("Error when connecting to DB : \n", error);
    }
}

startServer();

server.use(app);