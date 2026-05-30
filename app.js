import express from "express";
import { userRouter } from "./routes/userRoute.js";
import { articleRouter } from "./routes/articleRoute.js";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/article", articleRouter);

export { app };