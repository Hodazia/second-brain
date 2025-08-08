"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signin = exports.Signup = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const config_1 = require("../config");
// define auth routes like login and signup,
/* {username,password} */
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            console.error('User already exists:', username);
            res.status(409).json({
                message: "User already exists"
            });
            return;
        }
        // validate the request body via zod
        const userSchema = zod_1.z.object({
            username: zod_1.z.string().min(1, { message: "Please Enter your username" }).max(20, { message: "Username must not exceed 20 characters" }),
            password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long" }).max(20, { message: "Password must not exceed 20 characters" }).regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[\W_]/, "Password must contain at least one special character"),
        });
        const { success, error } = userSchema.safeParse(req.body);
        // only go forward when the body parses the schema , else throw error
        if (!success) {
            res.status(411).json({
                message: error.issues[0].message
            });
            return;
        }
        // Hash the password via bcrypt, 
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // Create new user with hashed password
        const newUser = yield db_1.UserModel.create({
            username: username,
            password: hashedPassword
        });
        console.log('Successfully created user:', username);
        res.status(201).json({
            message: "User signed up successfully",
            userId: newUser._id
        });
    }
    catch (e) {
        console.log("error creating user ", e);
        res.status(500).json({
            message: "Error creating users"
        });
    }
});
exports.Signup = Signup;
const Signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (!existingUser) {
            console.error('User not found:', username);
            res.status(403).json({
                message: "User not found"
            });
            return;
        }
        // compoare the now password with existinguser password
        const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password || '');
        if (!isPasswordValid) {
            console.error('Invalid password for user:', username);
            res.status(403).json({
                message: "Incorrect password"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_TOKEN);
        console.log('Successfully signed in user:', username);
        res.json({
            token
        });
    }
    catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({
            message: "Error signing in"
        });
    }
});
exports.Signin = Signin;
