import "./style.css";
import { useState } from "react";
import Logo from "../../assets/my_unsplash_logo.svg";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { getAllImgsByLabel, combine } from "../../store/ImagesData/imgData.js";

const Header = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  //upload img  to database
  const handleSubmit = async () => {
    try {
      const res = await fetch(`api/img/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error(res);
        toast.error("Fill the required Fields");
        return;
      }

      const data = await res.json();
      dispatch(combine(data));
      toast.success(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }

    setForm({});
    setModal(false);
  };

  // get data based on query
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      try {
        const res = await fetch(`/api/img/get?label=${query}`, {
          method: "GET",
        });

        const data = await res.json();

        dispatch(getAllImgsByLabel(data));
        console.log(data.message);
        setQuery("");
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  };

  // const getAllImages = async () => {
  //   try {
  //     const res = await fetch("api/img/getall", {
  //       method: "GET",
  //     });
  //     const data = await res.json();
  //     console.log("getAllImages when it reload");
  //     console.log(data);
  //     dispatch(getAllImages(data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="header">
      <div className="header_logo">
        <img src={Logo} alt="" className="logoImg" />
        <div className="search_container">
          <IoIosSearch size={22} color="#BDBDBD" className="search_icon" />
          <input
            type="text"
            className="search_input text1"
            placeholder="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>

      <button onClick={() => setModal(!modal)} className="add_btn text2">
        Add a photo
      </button>

      {modal ? (
        <div className="overlay scale-up-ver-top">
          <RxCross2
            size={30}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
            onClick={() => setModal(!modal)}
          />
          <div className="container_content">
            <h1 className="title text1">Add a new photo</h1>

            <div className="input_container">
              <div className="form_container">
                <label>Label</label>
                <input
                  type="text"
                  placeholder="Suspendisse elit massa"
                  id="label"
                  onChange={handleChange}
                />
              </div>

              <div className="form_container">
                <label>Photo Url</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
                  onChange={handleChange}
                  id="photoUrl"
                />
              </div>
            </div>

            <div className="btn_container">
              <button className="commom_btn btn1">Cancel</button>
              <button className="commom_btn btn2" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
