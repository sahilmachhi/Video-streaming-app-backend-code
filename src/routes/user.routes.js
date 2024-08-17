import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


export const userRoutes = Router()


userRoutes.post("/user/signup",
    upload.fields([

        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

userRoutes.post("/user/login", loginUser)

// secured routes
userRoutes.post("/user/logout", verifyJWT, logoutUser)

userRoutes.post("/user/refresh-token", refreshAccessToken)