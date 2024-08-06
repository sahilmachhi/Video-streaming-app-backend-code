import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js"



export const userRoutes = Router()


userRoutes.post("/user", registerUser)



