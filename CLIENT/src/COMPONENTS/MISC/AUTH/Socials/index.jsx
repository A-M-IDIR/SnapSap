import React from "react";

import { motion } from "framer-motion";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { socialInfo } from "@/RESOURCES/CONSTANTS/AuthForm";

import C from "./style.module.scss";

function Socials({ layer }) {
  const queryParams = new URLSearchParams(location.search);

  return (
    <div className={C.Socials} ref={layer}>
      <motion.a
        whileHover={{ y: -3 }}
        whileTap={{ y: 3 }}
        transition={{ type: "spring", stiffness: 1000, damping: 30 }}
        className={C.Social}
        href={socialInfo.linkedIn}
        target="_blank"
      >
        {SvgHandler.LinkedIn({ width: "22px" }, "#" + queryParams.get("color"))}
      </motion.a>

      <motion.a
        whileHover={{ y: -3 }}
        whileTap={{ y: 3 }}
        transition={{ type: "spring", stiffness: 1000, damping: 30 }}
        className={C.Social}
        href={socialInfo.gitHub}
        target="_blank"
      >
        {SvgHandler.Git({ width: "22px" }, "#" + queryParams.get("color"))}
      </motion.a>

      <motion.a
        whileHover={{ y: -3 }}
        whileTap={{ y: 3 }}
        transition={{ type: "spring", stiffness: 1000, damping: 30 }}
        className={C.Social}
        href={socialInfo.cv}
        target="_blank"
      >
        {SvgHandler.Read({ width: "22px" }, "#" + queryParams.get("color"))}
      </motion.a>
    </div>
  );
}

export default Socials;
