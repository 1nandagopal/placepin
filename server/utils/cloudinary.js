const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports.uploadImageCloudinary = async (imageURL) => {
  const result = await cloudinary.uploader.upload(imageURL, {
    folder: "placepin",
    resource_type: "image",
    use_filename: true,
    overwrite: false,
  });
  return result.public_id;
};

module.exports.deleteImageCloudinary = async (imageURL) => {
  const result = await cloudinary.uploader.destroy(imageURL, {
    resource_type: "image",
  });
  return result;
};
