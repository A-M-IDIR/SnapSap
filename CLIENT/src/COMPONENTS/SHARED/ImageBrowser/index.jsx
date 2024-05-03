import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "underscore";
import { AnimatePresence, motion } from "framer-motion";

import SearchBar from "../SearchBar";

import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

import C from "./style.module.scss";

function ImageBrowser({ setIsDropMenu, onChange, ...rest }) {
  const [images, setImages] = React.useState([{}]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      handleGetImages();
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (!QueryParamHandler.GetParam("query")) {
      handleGetImages();
    }

    handleGetImages(QueryParamHandler.GetParam("query"));
  }, [QueryParamHandler.GetParam("query")]);

  const handleImageSelect = (value) => {
    onChange(value);
  };

  const handleGetImages = (query) => {
    let key = "Q6QMxWPq2n2Y8zJ-HsNtBuznA_1ndkQuXeJtpwP5vgQ";
    let resultPerPage = 30;

    axios
      .get(
        `https://api.unsplash.com/search/photos?client_id=${key}&per_page=${resultPerPage}
         &query=${query ? query + " wallpaper" : "wallpaper"}`
      )
      .then((res) => {
        setImages(res.data.results);
      })
      .catch((err) => {
        AlertHandler(dispatch, "Error Fetching Images.");
        setIsDropMenu(false);
      });
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value.trim().toLowerCase();

    if (inputValue) {
      navigate(QueryParamHandler.UpdateParam("query", inputValue));
    } else {
      navigate(QueryParamHandler.RemoveParam("query"));
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        height: 0,
      }}
      animate={{
        opacity: 1,
        height: "250px",
        transition: { duration: 0.4, ease: [0.8, 0, 0, 1], delay: 0 },
      }}
      exit={{
        opacity: 1,
        height: "0",
        transition: { duration: 0.4, ease: [0.8, 0, 0, 1], delay: 0.2 },
      }}
      className={C.ImageBrowser}
      {...rest}
    >
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-100%)" }}
        animate={{
          opacity: 1,
          transform: "translateY(0)",
          transition: { duration: 0.4, ease: [0.8, 0, 0, 1], delay: 0.2 },
        }}
        exit={{
          opacity: 0,
          transform: "translateY(-100%)",
          transition: { duration: 0.4, ease: [0.8, 0, 0, 1], delay: 0.1 },
        }}
        className={C.Header}
        tabIndex={1}
      >
        <SearchBar
          style={{ maxWidth: "180px", height: "30px" }}
          onChange={_.debounce(handleSearch, 500)}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {images.length > 0 ? (
          <motion.div
            initial={{ opcity: 0, y: -5 }}
            animate={{ opcity: 1, y: 0, transition: { delay: 0.3 } }}
            exit={{ opcity: 0, y: -5 }}
            className={C.Container}
            key={"IMAGES"}
          >
            {images.map((e, i) => (
              <div
                className={C.Image}
                key={e.id ? e.id : i}
                onClick={() => {
                  handleImageSelect(e);
                }}
              >
                <img src={e.urls?.thumb} alt="BANNER" />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opcity: 0, y: -5 }}
            animate={{ opcity: 1, y: 0 }}
            exit={{ opcity: 0, y: -5 }}
            className={C.Empty}
            key={"EMPTY"}
          ></motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ImageBrowser;
