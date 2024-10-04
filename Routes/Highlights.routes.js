// routes/imageRoutes.js
import express from 'express';
import { getImages, addImage, deleteImage } from '../Controller/Highlights.controller.js';

const hrouter = express.Router();

// GET all images
hrouter.get('/getimages', getImages);
    
// POST a new image (if needed)
hrouter.post('/images', addImage);
hrouter.delete('/images/:id', deleteImage);

export default hrouter;
