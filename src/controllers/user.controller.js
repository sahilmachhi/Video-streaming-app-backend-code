import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uoloadOnCloudinary } from "../utils/cloudnary.js";


// export const registerUser = asyncHandler(async (req, res) => {
//     const { username, email, fullname, coverImage, avatar, watchHistory, password, refreshToken } = req.body


//     if (username === "" || email === "" || fullname === "" || password === "") {
//         throw new console.error("error in product fetch: ", error)
//         res.status(404).json({ success: false, message: "Product fetch failed" })
//     } else {
//         // res.status(200).json({ email: email })

//     }
// })

export const registerUser = async (req, res) => {
    try {
        const { username, email, fullname, password } = req.body


        if (!username || !email || !password || !fullname) {
            console.log("error in username")
            res.status(405).json({
                success: false
                , message: "error data not match the rules"
            })
        } else {
            const existingUser = User.findOne({
                $or: [{ email }, { username }]
            })

            if (existingUser) {
                res.status(409).json({
                    success: false
                    , message: "error user already exist"
                })
            }

            const avatarLocalPath = req.files?.avatar[0]?.path
            const coverImageLocalPath = req.files?.coverImage[0]?.path

            if (!avatarLocalPath) {
                res.status(400).json({
                    success: false
                    , message: "avatar file is required"
                })
            }

            const avatar = await uoloadOnCloudinary(avatarLocalPath)
            const coverImage = await uoloadOnCloudinary(coverImageLocalPath)

            if (!avatar) {
                res.status(400).json({
                    success: false
                    , message: "avatar file is required"
                })
            }

            const user = await User.create({
                fullname,
                email,
                username,
                password,
                coverImage: coverImage?.url || "",
                avatar: avatar.url
            })

            if (!user) {
                res.status(500).json({
                    success: false
                    , message: "server error failed to create user on server"
                })
            }

            res.status(200).json({ success: true, data: user })
        }

    } catch (error) {
        console.log(error)
        res.status(404).json({ success: false, message: "server error" })
    }
}



