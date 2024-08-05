import 'dotenv/config'
import connectDB from "./db/index.js"
import { app } from './app.js'


connectDB()
    .then(() => {
        app.listen(8000, () => {
            console.log("server is running on 8000")
        })
    })
    .catch(
        (err) => {
            console.log(`DB connection failed error:${err}`)
        }
    )