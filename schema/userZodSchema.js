import { z } from "zod";

export const signupZodSchema = z.strictObject({
    email: z.string().email("Invalid Email"),
    password: z.string().min(5, "Atleast 5 character required"),
    firstName: z.string(),
    lastName: z.string(),

});

export const signinZodSchema = z.strictObject({
    email: z.string().email("Invalid Email"),
    password: z.string()
});