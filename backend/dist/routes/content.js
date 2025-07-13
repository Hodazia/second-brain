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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContent = exports.GetContent = exports.PostContent = void 0;
const db_1 = require("../db");
const PostContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check what we are getting from the post request;
    console.log("title is", req.body.title);
    console.log("content is  ", req.body.content);
    console.log("links are  ", req.body.link);
    console.log("tags are ", req.body.tags);
    console.log("type is  ", req.body.type);
    //@ts-ignore
    console.log("who has send the user id ", req.userid);
    try {
        // Ensure tags is an array of strings
        const tags = Array.isArray(req.body.tags)
            ? req.body.tags.map((tag) => String(tag).trim()).filter((tag) => tag.length > 0)
            : [];
        // Create content with validated tags
        const newContent = yield db_1.ContentModel.create({
            content: req.body.content,
            link: req.body.link,
            type: req.body.type,
            title: req.body.title,
            //@ts-ignore
            userId: req.userId,
            tags: tags
        });
        console.log('Successfully created content:', {
            contentId: newContent._id,
            title: newContent.title,
            type: newContent.type,
            tags: newContent.tags
        });
        res.status(201).json({
            message: "Content added successfully",
            content: newContent
        });
    }
    catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({
            message: "Error signing in"
        });
    }
});
exports.PostContent = PostContent;
const GetContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch all the contents of a particular user
    try {
        const content = yield db_1.ContentModel.find({
            //@ts-ignore
            userId: req.userId
        }).populate("userId", "username");
        //check how many content each user has console it
        console.log(" the content length is ", content.length, " and the content is ", content);
        res.json({
            content
        });
    }
    catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({
            message: "Error signing in"
        });
    }
});
exports.GetContent = GetContent;
const DeleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    try {
        const result = yield db_1.ContentModel.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        });
        if (result.deletedCount === 0) {
            res.status(404).json({
                message: "Content not found or you don't have permission to delete it"
            });
            return;
        }
        res.json({
            message: "Content deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting content"
        });
    }
});
exports.DeleteContent = DeleteContent;
