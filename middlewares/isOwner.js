import { articleModel } from "../models/article.js";

export async function isOwner(req, res, next) {
    const articleId = req.params.id;
    //find by id
    const findArticle = await articleModel.findOne({
        _id: articleId
    });

    if (!findArticle) {
        return res.status(404).json({
            msg: "Article Not found"
        });
    }

    if (findArticle.author == req.id) {
        req.article = findArticle;
        next();
    } else {
        return res.status(403).json({
            msg: "Unauthorized Articles"
        });
    }

}