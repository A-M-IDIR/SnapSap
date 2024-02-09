import React from "react";

import propTypes from "prop-types";
import { motion } from "framer-motion";

import C from "./style.module.scss";

function Skeleton(props) {
  const { theme, ...rest } = props;

  return (
    <div
      className={`${C.Skeleton} ${theme === "light" ? C.Light : C.Dark}`}
      {...rest}
    >
      <motion.div
        className={C.Shadow}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, repeatDelay: 1, duration: 1 }}
      ></motion.div>
    </div>
  );
}

Skeleton.propTypes = {
  style: propTypes.object,
  theme: propTypes.oneOf(["light", "dark"]),
};

Skeleton.defaultProps = {
  style: {},
  theme: "light",
};

export default Skeleton;
