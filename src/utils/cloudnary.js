import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uoloadOnCloudinary = async (uploadUrl) => {
    try {
        if (!uploadUrl) return null
        const uploadResult = await cloudinary.uploader
            .upload(
                'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
                public_id: 'avatar',
            })
        console.log(uploadResult.url)

    } catch (error) {
        fs.unlinkSync(uploadUrl)
    }
}
