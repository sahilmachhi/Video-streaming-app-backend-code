import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { fs } from "fs"



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
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
        fs.unlinkSync(uploadUrl)
    }
}
