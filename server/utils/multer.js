const multer = require("multer");
const { v6: uuid } = require("uuid");
const CustomError = require("../models/customError");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/tmp");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const error = MIME_TYPE_MAP[file.mimetype]
      ? null
      : new Error("Invalid file type");
    cb(error, !error);
  },
  limits: {
    fileSize: 1000000,
  },
});

const uploadImage = (fieldname) => {
  if (!fieldname) throw new Error("Fieldname not specified");

  return (req, res, next) => {
    fileUpload.single(fieldname)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE")
          return next(
            new CustomError("File size exceeded, cannot upload!", 413)
          );
        else return next(new CustomError("File upload failed.", 500));
      } else if (err) {
        return next(new CustomError("Something went wrong, try again.", 500));
      }
      next();
    });
  };
};

module.exports = uploadImage;
