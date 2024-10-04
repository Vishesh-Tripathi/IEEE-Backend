// models/Image.js
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  description: String,
  event: String, // Optional: Associate with events
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;
    