import express from "express";
import {getAllImages, getImageDetails, uploadImage} from "../controllers/imageController";
import uploader from "../middleware/file-upload";
const ImageRoutes = express.Router();


// Route to handle image uploads
ImageRoutes.post("/upload", uploader.fields([{ name: 'picture' }, { name: 'detections' }]), uploadImage);

// Route to get all previously uploaded images
ImageRoutes.get('/images', getAllImages);

// Route to get details of a specific image
ImageRoutes.get('/image/:detections_id', getImageDetails);

export default ImageRoutes;
