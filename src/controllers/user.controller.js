import { asyncHandler } from "../utils/asyncHandler.js";

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
        const { username, email, fullname, coverImage, avatar, watchHistory, password, refreshToken } = req.body


        if (!username || !email || !password || !fullname) {
            console.log("error in username")
            res.status(405).json({
                success: false
                , message: "error data not match the rules"
            })
        } else {
            res.status(200).json({ success: true, data: req.body })
        }

    } catch (error) {
        console.log(error)
        res.status(404).json({ success: false, message: "server error" })
    }
}



