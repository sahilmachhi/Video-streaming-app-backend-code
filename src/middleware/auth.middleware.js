import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header.replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "error token not found"
            })
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken.id).select("-password -refreshToken")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found in database"
            })
        }

        req.body = user

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `error in verifyJWT function error is: ${error}`
        })
    }
}