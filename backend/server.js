import app from "./app.js";
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLINT_NAME,
    api_key: process.env.CLOUDINARY_CLINT_API,
    api_secret: process.env.CLOUDINARY_CLINT_SECRET,
})  

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});