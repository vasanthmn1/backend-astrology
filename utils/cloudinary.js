const cloudinary = require('cloudinary').v2



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
// const opts = {
//     overwrite: true,
//     invalidate: true,
//     resource_type: "auto",
// };

//   module.exports.uploadMultipleImages = (images) => {
//     return new Promise((resolve, reject) => {
//       const uploads = images.map((base) => uploadImage(base));
//       Promise.all(uploads)
//         .then((values) => resolve(values))
//         .catch((err) => reject(err));
//     });
//   }; 

module.exports = cloudinary