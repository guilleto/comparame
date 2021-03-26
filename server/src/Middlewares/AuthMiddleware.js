import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User";

// Return .env vars
dotenv.config();

export const AuthMiddleware = async (req, res, next) => {
    const token = req.header["Authorization"];
    if (token) {
        try {
            const verify = jwt.verify(token, process.env.PRIVATE_KEY);
            if (verify) {
                const verifyUser = await User.findById(verify);
                if (verifyUser) {
                    req.user = verifyUser;
                    next();
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "User not found.",
                    });
                }
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Invalid token.",
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "There was an error, please try again.",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Token is required.",
        });
    }
};
