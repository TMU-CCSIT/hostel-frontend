import { v2 as cloudinary } from "cloudinary"

export const cloudnairyconnect = () => {

    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
        console.log("Cloudinary connected");

    } catch (error: any) {
        console.log("error connecting Cloudinary : " + error)
    }
}

