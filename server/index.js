import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import uploadRoute from "./routes/upload.route.js";
//env
dotenv.config();

const app = express();
app.use(express.json());

//db connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server Started at: http://localhost:5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//routes
app.use("/api/img", uploadRoute);

//error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
