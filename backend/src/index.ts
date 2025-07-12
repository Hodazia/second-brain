
import dotenv from 'dotenv';
import express from 'express';
import { Signup, Signin } from './routes/auth';
import { UserModel, ContentModel, LinkModel } from './db';
import cors from "cors";
import { UserMiddleware } from './middleware';
import { GetContent, PostContent } from './routes/content';

const app =express();
app.use(express.json());

app.use(cors());
dotenv.config();

app.get("/", (req,res) => {
    res.status(200).json({message: "Successfully set up the configuration"});
});
app.post("/api/v1/signup", Signup);
app.post("/api/v1/signin", Signin);
app.post("/api/v1/content", UserMiddleware, PostContent);
app.get("/api/v1/content", UserMiddleware, GetContent);


app.listen(3000, () => {
    console.log("we are listening to 3000");
})