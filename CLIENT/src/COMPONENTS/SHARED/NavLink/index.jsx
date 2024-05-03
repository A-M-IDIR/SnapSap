import React from "react";

import { motion, AnimatePresence } from "framer-motion";
import propTypes from "prop-types";

import C from "./style.module.scss";

function NavLink({
  id,
  selectedLinkId,
  icon,
  label,
  action,
  indicator,
  ...rest
}) {
  return (
    <div
      className={`${C.NavLink} ${id === selectedLinkId && C.SelectedLink}`}
      onMouseDown={() => action(id)}
      {...rest}
    >
      <div className={C.Icon}>{icon}</div>

      {label && <p>{label}</p>}

      <AnimatePresence>
        {id === selectedLinkId && indicator && (
          <motion.div
            layoutId="NAVLINK_IND"
            transition={{ type: "spring", stiffness: 800, damping: 30 }}
            className={C.Indicator}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

NavLink.propTypes = {
  id: propTypes.string,
  selectedLinkId: propTypes.string,
  icon: propTypes.element,
  label: propTypes.string,
  indicator: propTypes.bool,
  action: propTypes.func,
};

export default NavLink;
