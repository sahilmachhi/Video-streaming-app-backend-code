import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/user.routes";

export const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json({ limit: "32kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

app.use("/users", userRoutes)

