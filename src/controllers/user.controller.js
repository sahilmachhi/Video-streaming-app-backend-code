import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";



export const registerUser = async (req, res) => {

    try {
        const { username, email, fullname, password } = req.body;

        if (!username || !email || !password || !fullname) {
            console.log("error in username")
            return res.status(405).json({
                success: false,
                message: "error data not match the rules"
            })
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "error user already exist"
            })
        }

        const avatarLocalPath = req.files.avatar[0].path;
        let coverImageLocalPath;

        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) coverImageLocalPath = req.files?.coverImage[0]?.path;


        if (!avatarLocalPath) {
            res.status(400).json({
                success: false
                , message: "avatar file is required"
            })
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if (!avatar) {
            res.status(400).json({
                success: false
                , message: "failed to find on localpath"
            })
        }

        const user = await User.create({
            fullname,
            email,
            username,
            password,
            coverImage: coverImage || "",
            avatar: avatar
        })

        if (!user) {
            return res.status(500).json({
                success: false
                , message: "server error failed to create user on server"
            })
        }

        return res.status(200).json({ success: true, data: user })

    } catch (error) {
        console.log(error)
        return res.status(404).json({ success: false, message: "server error" })
    }
}