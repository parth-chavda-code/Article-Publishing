import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

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
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = userModel.create({
            email,
            password: hashedPassword,
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

export const userSigninController = async (req, res) => {
    const { email, password } = req.body;
    //check user
    const find = await userModel.findOne({ email });
    if (!find) {
        return res.status(404).json({
            message: "User not found"
        })
    };
    //check password
    const checkPassword = await bcrypt.compare(password, find.password);

    if (!checkPassword) {
        return res.status(405).json({
            message: "Wrong Password"
        });
    }
    //JWT Token
    try {

        const token = jwt.sign({
            id: find._id
        }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.json({
            message: "Signin successfull",
            token: token
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            error: err,
            message: "Error when signing token"
        });
    }
}
