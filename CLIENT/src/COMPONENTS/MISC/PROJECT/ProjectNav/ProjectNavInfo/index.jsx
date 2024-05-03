import React from "react";

import propTypes from "prop-types";

import C from "./style.module.scss";
import Skeleton from "@/COMPONENTS/SHARED/Skeleton";

function ProjectNavInfo({ project, category, imageUrl }) {
  return (
    <div className={C.ProjectNavInfo}>
      <div className={C.ProjectImage}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: "0.8",
            }}
          />
        ) : (
          <Skeleton
            style={{
              width: "35px",
              height: "35px",
              backgroundColor: "rgb(220,220,220)",
            }}
            shadowStyle={{
              background: `linear-gradient(270deg,rgba(255, 255, 255, 0) 0%, rgba(160,160,160, 0.3) 50%, rgba(255, 255, 255, 0) 100%)`,
            }}
          />
        )}
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
