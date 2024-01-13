// store.js
import { configureStore } from '@reduxjs/toolkit';
import imgReducer from "./ImagesData/imgData";

export const store = configureStore({
  reducer: {
    img: imgReducer
  },
});
