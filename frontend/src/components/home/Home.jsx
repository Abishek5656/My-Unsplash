// Home.js
import "./style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllImages, deleteById } from "../../store/ImagesData/imgData.js";
const Home = () => {
  const dispatch = useDispatch();
  const { allImgs } = useSelector((state) => state.img);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const res = await fetch("api/img/getall", {
          method: "GET",
        });
        const data = await res.json();
        dispatch(getAllImages(data));
      } catch (error) {
        console.log(error);
        
      }
    };

    fetchAllImages();
  }, [dispatch]);

  //deletebyId
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/img/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      dispatch(deleteById(id));
      toast.success(data);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="home">
      <div className="home_wrapper">
        {allImgs &&
          allImgs.map((item) => (
            <div className="img_container" key={item._id}>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
              <img src={item.photoUrl} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
