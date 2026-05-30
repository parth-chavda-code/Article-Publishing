import mongoose from "mongoose";

const { Schema } = mongoose;

const user = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

const userModel = mongoose.model("users", user);

export { userModel };