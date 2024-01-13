import express from "express";
import {
  uploadImg,
  deleteImg,
  getImgByLabel,
  allImgs,
} from "../controllers/upload.controller.js";
const router = express.Router();

router.post("/create", uploadImg);

router.get("/get", getImgByLabel);

router.delete("/delete/:id", deleteImg);

router.get("/getall", allImgs);

export default router;
