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