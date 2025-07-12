import { Request, Response } from "express";
import { UserModel } from "../db";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {z} from "zod";
import { JWT_TOKEN } from "../config";

// define auth routes like login and signup,
export const Signup = async (req:Request, res:Response): Promise<void> => {
    // first check what the user is sending via POSTMAN testing,

    console.log("accepting requests ", req.body);

    // extract the username and password
    const username = req.body.username;
    const password = req.body.password;

    try {
        // input credentials are correct or not, 
        if (!username || !password) {
            console.error('Missing credentials:', { username: !!username, password: !!password });
            res.status(400).json({
                message: "Username and password are required"
            });
            return;
        }

        // check if there already exists a user with the same username and password, 
        // if there is then console user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            console.error('User already exists:', username);
            res.status(409).json({
                message: "User already exists"
            });
            return;
        }

        // validate the request body via zod
    const userSchema = z.object({
        username: z.string().min(1, { message: "Please Enter your username" }).max(20, { message: "Username must not exceed 20 characters" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(20, { message: "Password must not exceed 20 characters" }).regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[\W_]/, "Password must contain at least one special character"),
    })

    const { success, error } = userSchema.safeParse(req.body);

    // only go forward when the body parses the schema , else throw error
    if (!success) {
        res.status(411).json({
            message: error.issues[0].message
        })

        return;
    }
    // Hash the password via bcrypt, 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const newUser = await UserModel.create({
        username: username,
        password: hashedPassword
    });

    console.log('Successfully created user:', username);

    res.status(201).json({
        message: "User signed up successfully",
        userId: newUser._id
    });
    }
    catch(e)
    {
        console.log("error creating user ", e);
        res.status(500).json({
            message: "Error creating users"
        })
    }
}

export const Signin = async (req:Request, res:Response): Promise<void> => {
    // sigin body passed as this
    const username = req.body.username;
    const password = req.body.password;

    try {
        // check if the user has passed both the inputs, username and password
        if (!username || !password) {
            console.error('Missing credentials:', { username: !!username, password: !!password });
            res.status(400).json({
                message: "Username and password are required"
            });
            return;
        }

        // find if the user already exists in the DB
        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            console.error('User not found:', username);
            res.status(403).json({
                message: "User not found"
            });
            return;
        }

        // compoare the now password with existinguser password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password || '');
        if (!isPasswordValid) {
            console.error('Invalid password for user:', username);
            res.status(403).json({
                message: "Incorrect password"
            });
            return;
        }

        const token = jwt.sign({
            id: existingUser._id
        }, JWT_TOKEN);

        console.log('Successfully signed in user:', username);

        res.json({
            token
        });
    }
    catch(error)
    {
        console.error('Error during signin:', error);
        res.status(500).json({
            message: "Error signing in"
        });
    }
}