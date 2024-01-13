import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      // default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
      required: true,
    },
  },
  { timestamps: true }
);

const Upload = mongoose.model("Upload", uploadSchema);

export default Upload;
