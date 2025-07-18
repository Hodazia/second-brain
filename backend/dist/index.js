"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_1 = require("./routes/auth");
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const content_1 = require("./routes/content");
const brain_1 = require("./routes/brain");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.get("/", (req, res) => {
    res.status(200).json({ message: "Successfully set up the configuration" });
});
app.post("/api/v1/signup", auth_1.Signup);
app.post("/api/v1/signin", auth_1.Signin);
app.post("/api/v1/content", middleware_1.UserMiddleware, content_1.PostContent);
app.get("/api/v1/content", middleware_1.UserMiddleware, content_1.GetContent);
app.delete("/api/v1/content", middleware_1.UserMiddleware, content_1.DeleteContent);
app.post("/api/v1/brain/share", middleware_1.UserMiddleware, brain_1.ShareBrain);
app.post("/api/v1/brain/share/:shareId", middleware_1.UserMiddleware, brain_1.ShareBrainByShareId);
app.listen(3000, () => {
    console.log("we are listening to 3000");
});
