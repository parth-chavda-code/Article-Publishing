import express from "express";
import { userSignupController } from "../controllers/userController.js";
import { validationBody } from "../middlewares/zodValidation.js";
import { signupZodSchema } from "../schema/userZodSchema.js";

const userRouter = express.Router();
//User Signup
//validationBody = it is a middleware, checks req.body as per schema, we are passing schema here
//signupZodSchema = this one has zod schema for signup
//userSignupController = route handler, handle post request here,
userRouter.post("/signup", validationBody(signupZodSchema), userSignupController);

export { userRouter };