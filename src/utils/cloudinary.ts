
import cloudinary from '../cloudinary/Connect';
export class CloudinaryUtils {

    uploadImageToCloudinary = async (imageURL: string): Promise<CloudinaryUploadResponse> => {

        const newImage = await cloudinary.uploader.upload(imageURL, {
            folder: 'astrologyZodiac',

        });

        return {
            public_id: newImage.public_id,
            url: newImage.secure_url
        };

    }

}

interface CloudinaryUploadResponse {
    public_id: string;
    url: string;
}