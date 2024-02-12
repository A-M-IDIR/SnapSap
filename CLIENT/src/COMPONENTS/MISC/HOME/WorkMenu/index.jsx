import React from "react";

import { motion } from "framer-motion";

import Button from "@/COMPONENTS/SHARED/Button";

import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function WorkMenu(props) {
  const { sizeBreak, style, setIsDropMenu, windowWidth } = props;

  const [work, setWork] = React.useState([]);
  const [selected, setSelected] = React.useState({
    id: 1,
    label: "ASSIGNED",
  });

  const links = [
    { id: 1, label: "ASSIGNED" },
    { id: 2, label: "RECENT" },
    { id: 3, label: "PROJECTS" },
  ];

  const LightGray = {
    idle: {
      backgroundColor: "rgb(230,230,230)",
      color: "rgb(60, 60, 60)",
    },
    hover: { backgroundColor: "rgb(220, 220, 220)", color: "rgb(60, 60, 60)" },
    active: { backgroundColor: "rgb(230, 230, 230)" },
  };

  return (
    <div className={C.WorkMenu} style={windowWidth > sizeBreak ? style : {}}>
      <div className={C.Header}>
        <div className={C.Top}>
          <aside>
            <div className={C.Icon}>{SvgHandler.BriefCase()}</div>

            <p className={C.Label}>WORK</p>
          </aside>

          <WithDropMenu DropMenu={() => <></>}>
            <Button
              icon={SvgHandler.MenuDots()}
              theme={LightGray}
              style={{ height: "25px" }}
            />
          </WithDropMenu>
        </div>

        <Controller
          links={links}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <div className={C.Content}>
        {work.length === 0 ? (
          <div className={C.Image}>
            <img src="public/ASSETS/ICONS/DESERT.png" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

const Controller = (props) => {
  const { links, selected, setSelected } = props;

  return (
    <div className={C.Controller}>
      {links.map((e, i) => (
        <Link
          key={i}
          link={e}
          selectedId={selected.id}
          action={(link) => setSelected(link)}
        />
      ))}
    </div>
  );
};

const Link = (props) => {
  const { link, selectedId, action } = props;

  return (
    <div
      className={`${C.Link} ${link.id === selectedId && C.LinkSelected}`}
      onClick={() => action(link)}
    >
      <p>{link.label}</p>

      {link.id === selectedId && (
        <motion.div
          className={C.Indicator}
          layoutId="WORK_MENU_INDICATOR"
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
        ></motion.div>
      )}
    </div>
  );
};

export default WorkMenu;
