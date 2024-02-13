import React from "react";

import propTypes from "prop-types";

import C from "./style.module.scss";

function ProjectNavInfo(props) {
  const { project, category, imageUrl } = props;

  return (
    <div className={C.ProjectNavInfo}>
      <div className={C.ProjectImage}>
        <img src={imageUrl} alt="" />
      </div>

      <aside>
        <p className={C.ProjectName}>{project}</p>

        <p className={C.ProjectCategory}>{category}</p>
      </aside>
    </div>
  );
}

ProjectNavInfo.propTypes = {
  project: propTypes.string.isRequired,
  category: propTypes.string,
  imageUrl: propTypes.string,
};

ProjectNavInfo.defaultProps = {
  project: "UNTITLED",
  category: "-",
  imageUrl: "",
};

export default ProjectNavInfo;
