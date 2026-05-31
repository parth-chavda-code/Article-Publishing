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
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * 10;

    const findAll = await articleModel.find({
        status: "published"
    }).skip(skip).limit(limit);// skip first n no. Documents and limit shows n no. documents after skip

    res.json({
        findAll
    });
}