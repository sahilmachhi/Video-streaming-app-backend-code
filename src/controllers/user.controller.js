import asyncHandler from "../middleware/asyncHandler"
export const registerUser = asyncHandler(async (req, res) => {
    console.log(asyncHandler)
})

