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
exports.ShareBrainByShareId = exports.ShareBrain = void 0;
const utils_1 = require("../utils");
const db_1 = require("../db");
const ShareBrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // share the content via req.body.share , it has to be true
    const share = req.body.share;
    //@ts-ignore
    console.log("Reveived requests ", share, "\n", req.userId);
    try {
        const share = req.body.share;
        if (share) {
            //@ts-ignore
            console.log('Enabling sharing for user:', req.userId);
            const existingLink = yield db_1.LinkModel.findOne({
                //@ts-ignore
                userId: req.userId
            });
            if (existingLink) {
                res.json({
                    message: "Shareable link already exist",
                    Link: existingLink.hash
                });
                return;
            }
            const hash = (0, utils_1.random)(10);
            // create a new link and store it in linkmodel
            yield db_1.LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            });
            console.log('Successfully created share link');
            res.json({
                hash
            });
        }
        else {
            const result = yield db_1.LinkModel.deleteOne({
                //@ts-ignore
                userId: req.userId
            });
            res.json({
                message: "Removed link"
            });
        }
    }
    catch (error) {
        console.error('there is an error in sharing brain :');
        res.status(500).json({
            message: "Server error in sharing the brain",
        });
    }
});
exports.ShareBrain = ShareBrain;
const ShareBrainByShareId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareId;
    try {
        const link = yield db_1.LinkModel.findOne({
            hash
        });
        if (!link) {
            console.error('Error finding share link ');
            res.status(404).json({
                message: "incorrect input, the share link not founded"
            });
            return;
        }
        // else case, we found sharable link
        const content = yield db_1.ContentModel.find({
            userId: link.userId
        });
        const user = yield db_1.UserModel.findOne({
            _id: link.userId
        });
        if (!user) {
            console.error('User not found for share link:');
            res.status(404).json({
                message: "no user found"
            });
            return;
        }
        console.log('Successfully retrieved shared brain:', {
            username: user.username,
            contentCount: content.length,
            hash
        });
        res.json({
            username: user.username,
            content: content
        });
    }
    catch (error) {
        console.error('Error retrieving shared brain:');
        res.status(500).json({
            message: "Server error in retrieving the shared brain",
        });
    }
});
exports.ShareBrainByShareId = ShareBrainByShareId;
