import Upload from "../models/upload.model.js";
import { errorHandler } from "../utils/error.js";

//uploadImg
export const uploadImg = async (req, res, next) => {
  try {
    const newImg = await Upload.create(req.body);
    res.status(201).json(newImg);
  } catch (error) {
    next(error);
  }
};

//find my query
export const getImgByLabel = async (req, res, next) => {
  try {
    const { label } = req.query;
    console.log(label);
    const found = await Upload.find({ label }).sort({
      createdAt: -1,
    });

    if (!found) {
      return next(errorHandler(401, "Images not found"));
    }
    res.status(200).json(found);
  } catch (error) {
    next(error);
  }
};

//deleteImg based on Id
export const deleteImg = async (req, res, next) => {
  const img = await Upload.findById(req.params.id);
  if (!img) {
    return next(errorHandler(404, "Image is not found"));
  }
  try {
    const removeImg = await Upload.findByIdAndDelete(req.params.id);
    res.status(200).json("Image Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

//getallImg
export const allImgs = async (req, res, next) => {
  try {
    const imgs = await Upload.find().sort({
      createdAt: -1,
    });
    res.status(201).json(imgs);
  } catch (error) {
    next(error);
  }
};
