"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const UserMiddleware = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log("token..", token);
        if (!token) {
            res.status(400).json({
                message: "Bad token Request"
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_TOKEN);
        // 
        console.log("what is inside decoded  ", decoded);
        req.userId = decoded.id;
        next();
    }
    catch (e) {
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.UserMiddleware = UserMiddleware;
