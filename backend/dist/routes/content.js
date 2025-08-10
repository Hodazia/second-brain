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
exports.Filtercontents = exports.PutTagsData = exports.GetTagData = exports.DeleteContent = exports.GetContent = exports.PostContent = void 0;
const db_1 = require("../db");
const db_2 = require("../db");
const PostContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check what we are getting from the post request;
    console.log("title is", req.body.title);
    console.log("content is  ", req.body.content);
    console.log("links are  ", req.body.link);
    console.log("tags are ", req.body.tags);
    console.log("type is  ", req.body.type);
    //@ts-ignore
    console.log("who has send the user id ", req.userId); // it is userId
    try {
        // Ensure tags is an array of strings
        // const tags = Array.isArray(req.body.tags)
        //     ? req.body.tags.map((tag: unknown) => String(tag).trim()).filter((tag: string) => tag.length > 0)
        //     : [];
        // Validate tags is an array
        const tags = req.body.tags;
        if (!Array.isArray(tags) || tags.some(tag => typeof tag !== 'string')) {
            return;
            res.status(400).json({ message: "Tags must be an array of strings." });
        }
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
const GetTagData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield db_2.TagsModel.find({});
        return res.status(200).json({ tags });
    }
    catch (error) {
        return res.status(500).json({ message: "An internal error occurred", error: error.message });
    }
});
exports.GetTagData = GetTagData;
const PutTagsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Array of tags to be given, { tags: [] }
    const { tags } = req.body;
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ message: "Missing or invalid required field: tags." });
    }
    try {
        // Insert new tags if they don't exist
        const insertedTags = yield Promise.all(tags.map((tagName) => __awaiter(void 0, void 0, void 0, function* () {
            const existingTag = yield db_2.TagsModel.findOne({ name: tagName });
            if (!existingTag) {
                return new db_2.TagsModel({ name: tagName }).save();
            }
            return existingTag;
        })));
        return res.status(201).json({ message: "Tags created/updated successfully.", tags: insertedTags });
    }
    catch (error) {
        return res.status(500).json({ message: "An internal error occurred", error: error.message });
    }
});
exports.PutTagsData = PutTagsData;
const Filtercontents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // :content => [Youtube, ]
    const filterParam = req.params.content;
    //@ts-ignore
    const userId = req.userId;
    // Convert the filter parameter to lowercase for consistent matching
    const filter = filterParam.toLowerCase();
    // Use a mapping object for search values
    const filterMap = {
        'videos': 'Youtube',
        'tweets': 'Twitter',
        'documents': 'Document',
        'website': 'Links',
        'notion': 'Notion', //added notion as a type too
        'spotify': 'Spotify',
        'google docs': 'Google Docs',
        'google maps': 'Google Maps',
        'linkedin': 'Linkedin', // added medium blogs to the website
        'figma': 'Figma',
        'canva': 'Canva',
        'links': ['Links', 'Website'],
    };
    const type = filter === "all" ? '' : filterMap[filter];
    if (!userId) {
        return res.status(401).json({ message: "User not authenticated." });
    }
    // Check if the filter is valid before proceeding
    if (filter !== 'all' && !type) {
        return res.status(400).json({ message: "Invalid content filter provided." });
    }
    try {
        let query;
        if (type) {
            // If linkType is an array (e.g., "Links" case), use $in
            query = Array.isArray(type)
                ? { type: { $in: type }, userId }
                : { type, userId };
        }
        else {
            // Handle "All" case
            query = { userId };
        }
        const content = yield db_1.ContentModel.find(query);
        res.status(200).json({ message: "Content loaded successfully.", content });
    }
    catch (error) {
        res.status(500).json({ message: "An internal server error occurred." });
    }
});
exports.Filtercontents = Filtercontents;
