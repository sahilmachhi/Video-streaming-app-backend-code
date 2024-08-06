import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullname, coverImage, avatar, watchHistory, password, refreshToken } = req.body

    console.log({ email: email })

    res.status(200).json({ email: email })
})



