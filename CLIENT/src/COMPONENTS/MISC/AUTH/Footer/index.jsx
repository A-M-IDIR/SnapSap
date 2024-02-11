import React from "react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "@/COMPONENTS/SHARED/Button";

import C from "./style.module.scss";

function Footer(props) {
  const { text, action, path } = props;

  const navigate = useNavigate();

  return (
    <div className={C.Footer}>
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p className={C.CallToAction}>{text}</p>

        <p className={C.Link} onClick={() => navigate(path)}>
          {action}
        </p>
      </motion.aside>

      <Button
        label="DEMO-ACCOUNT"
        style={{ height: "26px", fontSize: "0.8rem" }}
      />
    </div>
  );
}

export default Footer;
