import mongoose from "mongoose";

const { Schema } = mongoose;

const article = new Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    publish_date: { type: Date, default: null },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    }
});

const articleModel = mongoose.model("articles", article);

export { articleModel };