import React from "react";

import propTypes from "prop-types";

import C from "./style.module.scss";

function NavLink(props) {
  const { id, selectedLinkId, icon, label, action, ...rest } = props;

  return (
    <div
      className={`${C.NavLink} ${id === selectedLinkId && C.SelectedLink}`}
      onClick={() => action(id)}
      {...rest}
    >
      <div className={C.Icon}>{icon}</div>

      {label && <p>{label}</p>}
    </div>
  );
}

NavLink.propTypes = {
  id: propTypes.string,
  selectedLinkId: propTypes.string,
  icon: propTypes.element,
  label: propTypes.string,
  action: propTypes.func,
};

export default NavLink;
