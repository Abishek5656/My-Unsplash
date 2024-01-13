// imgData.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allImgs: [],
};

export const imgSlice = createSlice({
  name: "img",
  initialState,
  reducers: {
    
    getAllImgsByLabel: (state, action) => {
      state.allImgs = action.payload;
    },

    getAllImages: (state, action) => {
      state.allImgs = action.payload;
    },

    combine: (state, action) => {
      const newImg = action.payload;

      const updatedImgs = [...state.allImgs, newImg];

      const sortedImgs = updatedImgs.sort((a, b) => b.createdAt - a.createdAt);

      state.allImgs = sortedImgs;
    },

    deleteById: (state, action) => {
      const removeImgById = state.allImgs.filter(
        (img) => img._id !== action.payload
      );
      state.allImgs = removeImgById;
    },
  },
});

export const { getAllImgsByLabel, getAllImages, combine, deleteById } =
  imgSlice.actions;

export default imgSlice.reducer;
