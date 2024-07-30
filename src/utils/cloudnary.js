// import {v2 } from "cloundinary"
import fs from "fs"


v2.config({
    cloud_name: "",
    api_key: "api_key",
    api_seceret: "",
})

export const uoloadOnCloudinary = async (uploadUrl) => {
    try {
        if (!uploadUrl) return null
        console.log(uploadUrl)
    } catch (error) {
        console.log("upload failed: ", error)
    }
}
