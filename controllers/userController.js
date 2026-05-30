import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";

export const userSignupController = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    //find user
    const find = await userModel.findOne({ email });
    if (find) {
        return res.status(500).json({
            Message: "User exist"
        });
    }

    //create user

    try {
        //password hashing
        const passwordHashing = await bcrypt.hash(password, 10);

        //create user
        const user = userModel.create({
            email,
            password,
            firstName,
            lastName
        });
        res.json("User Register successfully");
    } catch (err) {
        res.status(402).json({
            Error: err,
            Message: "Error when creating a user"
        })
    }
};