import React from "react";

import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { motion } from "framer-motion";

import C from "./style.module.scss";

function PageInfo({ label, links }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className={C.PageInfo}>
      <div className={C.Links}>
        {links.map((e, i) => (
          <motion.div
            initial={{ transform: "translateX(-5px)", opacity: 0 }}
            animate={{
              transform: "translateY(0)",
              opacity: 1,
              transition: {
                delay: i * 0.1,
                duration: 0.4,
                ease: [0.8, 0, 0, 1],
              },
            }}
            exit={{
              transform: "translateX(5px)",
              opacity: 0,
              transition: {
                delay: i * 0.1,
                duration: 0.4,
                ease: [0.8, 0, 0, 1],
              },
            }}
            key={i}
            className={C.Link}
          >
            <p onMouseUp={() => handleClick(e.path)}>{e.label}</p>

            {i + 1 < links.length && <span>/</span>}
          </motion.div>
        ))}
      </div>

      <div className={C.Title}>
        <motion.h1
          initial={{ transform: "translateY(100%)", opacity: 0 }}
          animate={{
            transform: "translateY(0)",
            opacity: 1,
            transition: { ease: [0.8, 0, 0, 0.8], delay: 0.15 },
          }}
          exit={{ transform: "translateY(100%)", opacity: 0 }}
          transition={{ ease: [0.8, 0, 0, 0.8] }}
        >
          {label.toUpperCase()}
        </motion.h1>

        <motion.div
          initial={{
            transform: "translate(-50%,-50%)",
            opacity: 0,
            width: "100%",
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "90%",
            transition: { ease: [0.8, 0, 0, 0.8] },
          }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          transition={{ ease: [0.8, 0, 0, 0.8], delay: 0.1 }}
          className={C.Shadow}
        ></motion.div>
      </div>
    </div>
  );
}

PageInfo.propTypes = {
  label: propTypes.string.isRequired,
  links: propTypes.arrayOf(
    propTypes.shape({ label: propTypes.string, path: propTypes.string })
  ).isRequired,
};

PageInfo.defaultProps = {
  label: "",
  links: [],
};

export default PageInfo;
