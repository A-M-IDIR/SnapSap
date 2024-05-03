import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import C from "./style.module.scss";

function ColorSwitch({ layer }) {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParms = new URLSearchParams(location.search);

  const colors = ["e8513a", "4e4eff", "078d45", "7000bb"];

  React.useEffect(() => {
    navigate(
      location.pathname +
        "?section=" +
        urlParms.get("section") +
        "&color=" +
        colors[1]
    );
  }, []);

  return (
    <div className={C.ColorSwitch} ref={layer}>
      {colors.map((e, i) => (
        <motion.div
          whileHover={{ y: -3 }}
          whileTap={{ y: 3 }}
          transition={{ type: "spring", stiffness: 1000, damping: 30 }}
          className={C.Color}
          key={i}
          style={{ backgroundColor: "#" + e }}
          onClick={() => {
            navigate(
              location.pathname +
                "?section=" +
                urlParms.get("section") +
                "&color=" +
                e
            );
          }}
        ></motion.div>
      ))}
    </div>
  );
}

export default ColorSwitch;
