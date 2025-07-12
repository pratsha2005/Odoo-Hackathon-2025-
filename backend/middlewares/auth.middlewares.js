import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";

export const auth = async (req, res, next) => {
    // Accept token from Authorization header (Bearer <token>) or cookies
    let token = null;

    // Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ message: "Log in First" });
    }

    try {
        const decode = jwt.verify(token, process.env.JSONSECRETKEY);
        if (!decode) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = await User.findById(decode.userId).select("-password");
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};