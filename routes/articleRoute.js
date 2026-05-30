import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { createArticle } from "../controllers/articleController.js";

const articleRouter = express.Router();

//Create Article
articleRouter.post("/create", authMiddleware, createArticle);

export { articleRouter };