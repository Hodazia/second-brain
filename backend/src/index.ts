
import dotenv from 'dotenv';
import express from 'express';
import { Signup, Signin } from './routes/auth';
import { UserModel, ContentModel, LinkModel, connectDb } from './db';
import cors from "cors";
import { UserMiddleware } from './middleware';
import { DeleteContent, Filtercontents, GetContent, GetTagData, PostContent, PutTagsData } from './routes/content';
import { ShareBrain, ShareBrainByShareId } from './routes/brain';
import { SearchedFilter } from './routes/search';

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
app.delete("/api/v1/content", UserMiddleware, DeleteContent);
app.post("/api/v1/brain/share", UserMiddleware, ShareBrain);
app.get("/api/v1/brain/share/:shareId", UserMiddleware, ShareBrainByShareId);
app.get('/api/v1/tags',UserMiddleware, GetTagData);
app.put('/api/v1/tags',UserMiddleware,PutTagsData);
app.get('/api/v1/contents/:content',UserMiddleware,Filtercontents);
// Add search functionality for dashboard as well as dashboard/:content , 2 different

app.get("/api/v1/search",UserMiddleware,SearchedFilter);

app.listen(3000, () => {
    console.log("we are listening to 3000");
    connectDb();
})