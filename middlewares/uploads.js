import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import 'dotenv/config'


cloudinary.config ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const profilePictureUpload = multer ({
    storage: new CloudinaryStorage ({
        cloudinary,
        params: {
            folder: "private-tutoring-api/profile-picture",
        }
    })
});

export const applicationUpload = multer({
    storage: new CloudinaryStorage({
      cloudinary,
      params: (req, file) => {
        let folder = "private-tutoring-api/general";
  
        if (file.fieldname === "uploadCv") {
          folder = "private-tutoring-api/cv";
        } else if (file.fieldname === "anyOtherDocumentToUpload") {
          folder = "private-tutoring-api/other-documents";
        }
  
        return {
          folder,
        };
      },
    }),
  });
  
