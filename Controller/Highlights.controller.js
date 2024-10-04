import Image from '../Models/Higlights.model.js';

// Get all images
export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images); // Only return URLs
  } catch (error) {
    res.status(500).json({ error: 'Server error: unable to fetch images' });
  }
};

// Add new image (optional)
export const addImage = async (req, res) => {
  try {
    const newImage = new Image({
      url: req.body.url,
      description: req.body.description,
      event: req.body.event,
    });
    // console.log(newImage)
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: 'Server error: unable to add image' });
  }
};

// Delete an image by ID
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by ID and delete it
    const deletedImage = await Image.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ message: 'Image deleted successfully', deletedImage });
  } catch (error) {
    res.status(500).json({ error: 'Server error: unable to delete image' });
  }
};
