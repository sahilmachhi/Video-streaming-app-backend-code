import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    coverImage: {
        type: String, //cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "password is required"],
    },
    refreshToken: {
        type: String
    }
}, { timestamps: True })

export const User = mongoose.model("User", userSchema)