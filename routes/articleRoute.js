import express from "express";
//Middlewares
import { authMiddleware } from "../middlewares/auth.js";
import { isOwner } from "../middlewares/isOwner.js";
//Controller
import { createArticle, publishArticle, allArticle, singleArticle } from "../controllers/articleController.js";

const articleRouter = express.Router();

//Create Article
articleRouter.post("/create", authMiddleware, createArticle);
//Publish Article
articleRouter.patch("/:id/publish", authMiddleware, isOwner, publishArticle);
//Get all Articles
articleRouter.get("/all", allArticle);
//Get single article
articleRouter.get("/single/:id",singleArticle);

export { articleRouter };