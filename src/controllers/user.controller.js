import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import jwt from "jsonwebtoken"

const generateAccessTokenAndRefreshToken = async (userId) => {
    console.log(userId)
    debugger
    try {
        const user = await User.findById(userId)
        console.log(user)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: true })

        return { accessToken, refreshToken }

    } catch (error) {
        console.log(error)
    }
}

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

export const loginUser = async (req, res) => {
    debugger
    try {
        const { email, username, password } = req.body

        if (!email && !username) {
            return res.status(405).json({
                success: false,
                message: "error username or email is missing from client"
            })
        }

        if (!password) {
            return res.status(405).json({
                success: false,
                message: "error password is missing from client"
            })
        }

        let user = await User.findOne({
            $or: [{ username }, { email }]
        })

        console.log(`database user: ${user}`)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user is not found on database"
            })
        }

        const isPasswordVaild = await user.isPasswordCorrect(password)

        if (!isPasswordVaild) {
            return res.status(406).json({
                success: false,
                message: "user password is not correct"

            })
        }
        console.log(user._id)
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id.toString())


        const fieldsToDelete = ["password", "refreshToken"];

        fieldsToDelete.forEach(function (field) {
            delete user[field];
        });

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json({
            success: true,
            data: user,
            accessToken: accessToken,
            refreshToken: refreshToken
        })


    } catch (error) {
        return res.status(405).json({
            success: false,
            message: "failed from database"
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        const user = req.body

        await User.findByIdAndUpdate(
            user._id.toString(), {
            $set: {
                refreshToken: undefined
            }
        },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
            {
                success: true,
                message: "user loggedout successfully"
            }
        )
    } catch (error) {
        return res.status(405).json({
            success: false,
            message: "error in logout user"
        })
    }
}

export const refreshAccessToken = async (req, res) => {
    try {

        const incomingAccessToken = req.cookies.refreshToken || req.body.refreshToken

        if (!incomingAccessToken) {
            return res.status(401).json({
                success: false,
                message: "error accessing refreshToken"
            })
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken.id.toString())

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "error user not found"
            })
        }

        if (decodedToken !== user?.refreshToken) {
            return res.status(401).json({
                success: false,
                message: "refreshToken is expired or used somewhere else"
            })
        }

    } catch (error) {
        return res.status(405).json({
            success: false,
            message: "error in generating AccessToken"
        })
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    const { accessToken, newRefreshToken } = generateAccessTokenAndRefreshToken(user._id.toString())

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newRefreshToken, options).json({
        success: true,
        accessToken: accessToken,
        refreshToken: newRefreshToken,
        message: "accessToken refreshed successfully"
    })


}