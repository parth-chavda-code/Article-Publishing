import { articleModel } from "../models/article.js"

//Create Controller
export const createArticle = async (req, res) => {
    const { title, content } = req.body;

    try {
        const result = await articleModel.create({
            author: req.id,
            title,
            content
        });

        res.json({
            msg: "Article saved as draft"
        });

    } catch (err) {
        res.status(404).json({
            msg: "Error when creating an article"
        });
    }
}

//Publish Article
export const publishArticle = async (req, res) => {
    const articleId = req.params.id;

    if (req.article.status == "published") {
        return res.status(400).json({ msg: "Article Already Published" });
    }

    try {
        const updateResult = await articleModel.findByIdAndUpdate(articleId, {
            publish_date: Date.now(),
            status: "published"
        });
        res.json({
            msg: "Update successfully",
        });

    } catch (err) {
        return res.status(404).json({
            msg: "Error when updating"
        })

    }
}

//Get All the articles
export const allArticle = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    try {
        const findAll = await articleModel.find({
            status: "published"
        }).skip(skip).limit(limit);// skip first n no. Documents and limit shows n no. documents after skip

        res.json({
            findAll
        });

    } catch (err) {
        res.status(404).json({
            msg: "Error in get article"
        });
    }
}

//Get single article
export const singleArticle = async (req, res) => {
    const id = req.params.id;
    try {
        const findSingleArticle = await articleModel.findOne({ _id: id });
        res.json({
            article: findSingleArticle
        });
    } catch (err) {
        return res.status(404).json({ msg: "Article not found" });
    }
}

//Edit Article
export const editArticle = async (req, res) => {
    try {
        const { title, content, status } = req.body;

        const article = req.article;

        article.title = title;
        article.content = content;
        article.status = status;

        await article.save();

        return res.json({
            msg: "Article updated successfully",
            article
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Error when editing article"
        });
    }
}