import React from "react";

import propTypes from "prop-types";

import C from "./style.module.scss";

function PageInfo(props) {
  const { label, links } = props;

  const handleClick = (path) => {
    // NAVIGATE TO THE CORRECT PAGE
  };

  return (
    <div className={C.PageInfo}>
      <div className={C.Links}>
        {links.map((e, i) => (
          <p key={i} onClick={handleClick(e.path)}>
            {e.label}
          </p>
        ))}
      </div>

      <div className={C.Title}>
        <h1>{label.toUpperCase()}</h1>
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
