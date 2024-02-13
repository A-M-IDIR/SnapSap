import React from "react";

import propTypes from "prop-types";
import { v4 } from "uuid";

import Button from "@/COMPONENTS/SHARED/Button";

import WithPopUp from "@/RESOURCES/HOCS/WithPopUp";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function Members(props) {
  const { members } = props;

  const lightGrayArgs = {
    idle: {
      backgroundColor: "rgb(240, 240, 240)",
      color: "rgb(60, 60, 60)",
      iconColor: "rgb(60, 60, 60)",
    },
    hover: {
      backgroundColor: "rgb(220, 220, 220)",
      color: "rgb(60, 60, 60)",
      iconColor: "rgb(60, 60, 60)",
    },
    active: { backgroundColor: "rgb(230, 230, 230)" },
  };

  return (
    <div className={C.Members}>
      {members.length > 0 && (
        <ul>
          {members.slice(0, 3).map((e, i) => (
            <li className={C.Member} key={v4()}>
              <div className={C.ImageContainer}>
                <img src={e.avatar} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <WithPopUp PopElement={() => <></>}>
        <Button
          icon={SvgHandler.AddUser({ width: "14px", marginLeft: "0.09rem" })}
          theme={lightGrayArgs}
          style={{ width: "36px", height: "36px", borderRadius: "50%" }}
        />
      </WithPopUp>
    </div>
  );
}

Members.propTypes = {
  members: propTypes.arrayOf(
    propTypes.shape({
      avatar: propTypes.string,
    })
  ),
};

Members.defaultProps = {
  members: [],
};

export default Members;
