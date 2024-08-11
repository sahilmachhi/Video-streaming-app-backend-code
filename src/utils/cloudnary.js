import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"



cloudinary.config({
    cloud_name: 'dx44ae7xd',
    api_key: '153441149783215',
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (uploadUrl) => {
    debugger
    try {
        if (!uploadUrl) return null
        const uploadResult = await cloudinary.uploader
            .upload(
                uploadUrl
            )
        console.log(uploadUrl)
        return uploadResult.url
    } catch (error) {
        console.log(`cloudinary error : ${error.message}`)
        fs.unlinkSync(uploadUrl)
    }
}
