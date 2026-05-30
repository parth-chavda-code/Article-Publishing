import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authMiddleware(req, res, next) {
    const token = req.headers.token;
    //verify token

    if (!token) {
        return res.status(401).json({
            message: "Token is not provided"
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decode.id;
        next();

    } catch (err) {
        return res.status(403).json({
            msg: "Unauthorised access"
        });
    }

}