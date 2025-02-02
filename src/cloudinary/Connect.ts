
import cloudinary from 'cloudinary'


let cloudinaryConnect = cloudinary.v2

cloudinaryConnect.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// module.exports = cloudinaryConnect

export default cloudinaryConnect