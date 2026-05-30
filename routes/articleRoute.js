import express from "express";
//Middlewares
import { authMiddleware } from "../middlewares/auth.js";
import { isOwner } from "../middlewares/isOwner.js";
//Controller
import { createArticle, publishArticle } from "../controllers/articleController.js";

const articleRouter = express.Router();

//Create Article
articleRouter.post("/create", authMiddleware, createArticle);
//Publish Article
articleRouter.patch("/:id/publish", authMiddleware, isOwner, publishArticle);

export { articleRouter };