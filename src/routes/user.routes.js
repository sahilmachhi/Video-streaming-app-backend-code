import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";


export const userRoutes = Router()


userRoutes.post("/user", upload.fields([

    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), registerUser)



