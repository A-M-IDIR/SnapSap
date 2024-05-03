import React from "react";

import { useDispatch } from "react-redux";
import { ColorPicker } from "antd";
import _ from "underscore";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import AdjustColorHandler from "@/RESOURCES/HANDLERS/AdjustColorHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { addGroup } from "@/CONTEXT/MISC/HOME/GroupSlice";
import { groupStyles } from "@/RESOURCES/CONSTANTS/GroupList";

import C from "./style.module.scss";

function GroupPopUp({ popUp }) {
  const [label, setLabel] = React.useState("");
  const [color, setColor] = React.useState("#6969ff");
  const [styleType, setStyleType] = React.useState(1);
  const [style, setStyle] = React.useState(groupStyles[styleType](color));

  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const addGroupMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(addGroup(result.data));
      popUp(false);
      AlertHandler({ dispatch, message: "Added !", type: "success" });
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    if (styleType && color) {
      setStyle(groupStyles[styleType](color));
    }
  }, [color, styleType]);

  const handleUpdateColor = (value) => {
    setColor(AdjustColorHandler(value.toHexString(), 180, 0.3));
  };

  const handleUpdateStyleType = () => {
    if (styleType === Object.keys(groupStyles).length) {
      setStyleType(1);
      return;
    }

    setStyleType(styleType + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addGroupMutation.mutate({
      route: "group",
      method: "POST",
      load: {
        color,
        style: styleType,
        label,
      },
    });
  };

  return (
    <form className={C.GroupPopUp} onSubmit={handleSubmit}>
      <div className={C.Style}>
        <div className={C.StyleButton} onClick={handleUpdateStyleType}>
          {SvgHandler.Pen({ width: "10px" })}
        </div>

        <div className={C.PickerHolder}>
          <ColorPicker
            defaultValue="#6969ff"
            showText
            disabledAlpha
            size="small"
            onChange={_.debounce(handleUpdateColor, 300)}
          />
        </div>

        <div className={C.StylePattern}>{style}</div>
      </div>

      <input
        className={C.Input}
        value={label || ""}
        onChange={(e) => setLabel(e.target.value)}
      />
    </form>
  );
}

export default GroupPopUp;
