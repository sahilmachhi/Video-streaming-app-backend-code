import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/user.routes.js";

export const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
// app.use(express.urlencoded())
app.use(express.static("public"))

app.use("/api", userRoutes)

