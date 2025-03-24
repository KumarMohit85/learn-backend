import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath)
            return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log("file has been succesfully uploaded on cloudinary", response.url);
        console.log(localFilePath);

        // Check if file exists before deleting
        if (fs.existsSync(localFilePath)) {
            console.log("deleting local file after succesfully upload to cloudinary");

            fs.unlinkSync(localFilePath);
        }
        return response;

    } catch (error) {
        // Check if file exists before deleting
        if (fs.existsSync(localFilePath)) {
            console.log("deleting local file after error while upload to cloudinary");
            fs.unlinkSync(localFilePath);
        }  // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary }