import { type } from "express/lib/response"
import mongoose from "mongoose"
import { User } from "./user.model"

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    owner: {
        types: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})




export const Video = mongoose.model("Video", videoSchema)