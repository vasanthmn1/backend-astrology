const asyncCntrol = require('express-async-handler')
const zodiacModel = require('../model/zodiacModel');
const cloudinary = require('../utils/cloudinary');




const uploadImageToCloudinary = async (imageURL) => {
    try {
        const newImage = await cloudinary.uploader.upload(imageURL, {
            folder: 'astrologyZodiac',
            // Additional options if needed
            // width: 1000,
            // crop: 'scale'
        });

        return {
            public_id: newImage.public_id,
            url: newImage.secure_url
        };
    } catch (error) {
        throw new Error('Failed to upload image to Cloudinary.');
    }
};

const createPosts = async (title, poto, desc, date) => {
    try {
        const image = await uploadImageToCloudinary(poto.url);

        const newPost = await zodiacModel.create({
            title,
            poto: image,
            desc,
            date
        });

        return newPost;
    } catch (error) {
        throw new Error('Failed to create post.');
    }
};


const createpost = async (req, res) => {
    const { title, poto, desc, date } = req.body;

    try {
        const newPost = await createPosts(title, poto, desc, date);
        console.log(newPost);
        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




// const createpost = asyncCntrol(async (req, res) => {
//     const { title, poto, desc, date } = req.body
//     try {

//         // const data = { title: title, date: date, desc: desc }

//         const newImage = await cloudinary.uploader.upload(poto, {
//             folder: "astrologyZodiac",
//             // width: 1000,
//             // crop: "scale"
//         })

//         const newPost = await zodiacModel.create({
//             title,
//             poto: {
//                 public_id: newImage.public_id,
//                 url: newImage.secure_url
//             },
//             desc,
//             date
//         })
//         res.status(200).json(newPost)

//     } catch (error) {
//         res.status(400)
//         throw new Error({ error: error.message })
//     }
// })
// data.poto = {
//     public_id: newImage.public_id,
//     url: newImage.secure_url
// }
// if(poto !==""){
//     const imageId= 
// }


// if (poto) {
//     const uploadRes = await cloudinary.uploader.upload(poto, {
//         upload_preset: "zodia-post"
//     })
//     if (uploadRes) {
//         const zodiacCreate = new zodiacModel({
//             title,
//             desc,
//             date,
//             poto: poto.public_id
//         })
//         const saves = await zodiacCreate.save()
//         res.status(200).json(saves)

//     }
// }
// const newPost = await zodiacModel.create(req.body)

const getpost = asyncCntrol(async (req, res) => {
    try {
        const getPost = await zodiacModel.find()
        res.status(200).json(getPost)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

const delpost = asyncCntrol(async (req, res) => {
    try {
        const delPost = await zodiacModel.findByIdAndRemove(req.params.id,
            req.body
            , { new: true })
        res.status(200).json(delPost)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

// const editpost = async (req, res) => {
//     try {
//         const { title, poto, desc, date } = req.body;
//         // const editPost = await zodiacModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         const editPost = await zodiacModel.findById(req.params.id)
//         if (!editPost) {
//             return res.status(404).json({ error: 'Post not found' });
//         }
//         let data = {
//             title,
//             desc,
//             date,
//             poto: editPost.poto
//         }
//         if (poto !== '') {
//             const imgId = editPost.poto.public_id;

//             if (imgId) {
//                 await cloudinary.uploader.destroy(imgId)
//             }
//             try {
//                 const newimg = await cloudinary.uploader.upload(poto, {
//                     folder: 'astrologyZodiac'

//                 })

//                 data.poto = {
//                     public_id: newimg.public_id,
//                     url: newimg.url
//                 }
//             } catch (error) {
//                 console.error("img", error);
//                 res.status(400).json({ error: 'Failed to upload image to Cloudinary' });
//                 return;
//             }


//         }

//         const updateposts = await zodiacModel.findByIdAndUpdate(req.params.id, {
//             title: data.title,
//             desc: data.desc,
//             date: data.date,
//             poto: data.poto,
//         }, { new: true })
//         // if (!updatepost) {
//         //     return res.status(404).json({ error: 'Post not found' });
//         // }
//         res.status(200).json(updateposts)
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: 'An error occurred while editing the post' });
//         throw new Error(error);
//     }
// }

const editpost = async (req, res) => {
    try {
        const { title, desc, date } = req.body;
        // const editPost = await zodiacModel.findById(req.params.id);
        // if (!editPost) {
        //     return res.status(404).json({ error: 'Post not found' });
        // }
        let data = {
            title,
            desc,
            date,
            // poto
        };
        // if (typeof poto === 'object' && poto !== null) {
        //     const imgId = editPost.poto.public_id;

        //     if (imgId) {
        //         await cloudinary.uploader.destroy(imgId);
        //     }
        //     try {
        //         const newimg = await cloudinary.uploader.upload(poto.file, {
        //             folder: 'astrologyZodiac'
        //         });

        //         data.poto = {
        //             public_id: newimg.public_id,
        //             url: newimg.url
        //         };
        //     } catch (error) {
        //         console.error("img", error);
        //         res.status(400).json({ error: 'Failed to upload image to Cloudinary' });
        //         return;
        //     }
        // }

        const updateposts = await zodiacModel.findByIdAndUpdate(req.params.id, {
            title: data.title,
            desc: data.desc,
            date: data.date,
            // poto: data.poto,
        }, { new: true });

        res.status(200).json(updateposts);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while editing the post' });
        throw new Error(error);
    }
};

const editpostimg = async (req, res) => {
    try {
        const { poto } = req.body;
        const editPost = await zodiacModel.findById(req.params.id);
        if (!editPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        let data = {
            poto
        };
        if (typeof poto === 'object' && poto !== null) {
            const imgId = editPost.poto.public_id;

            if (imgId) {
                await cloudinary.uploader.destroy(imgId);
            }
            try {
                const newimg = await cloudinary.uploader.upload(poto.file, {
                    folder: 'astrologyZodiac'
                });

                data.poto = {
                    public_id: newimg.public_id,
                    url: newimg.url
                };
            } catch (error) {
                console.error("img", error);
                res.status(400).json({ error: 'Failed to upload image to Cloudinary' });
                return;
            }
        }

        const updateimage = await zodiacModel.findByIdAndUpdate(req.params.id, {
            poto: data.poto,
        }, { new: true });

        res.status(200).json(updateimage);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while editing the post' });
        throw new Error(error);
    }

}

const getone = asyncCntrol(async (req, res) => {
    try {
        const getPost = await zodiacModel.findById(req.params.id)
        res.status(200).json(getPost)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})
module.exports = {
    createpost,
    getpost,
    delpost,
    editpost,
    getone,
    editpostimg
}