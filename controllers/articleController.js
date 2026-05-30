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
