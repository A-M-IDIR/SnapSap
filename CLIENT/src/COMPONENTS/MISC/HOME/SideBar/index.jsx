import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import NavLink from "@/COMPONENTS/SHARED/NavLink";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function SideBar() {
  const [selected, setSelected] = React.useState(null);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);

  const handleClick = (id) => {
    navigate(`/home?section=${id}`);
  };

  React.useEffect(() => {
    if (queryParams.get("section")) {
      setSelected(queryParams.get("section"));
    }
  }, [queryParams.get("section")]);

  return (
    <div className={C.SideBar}>
      <div className={C.Logo}>{SvgHandler.SnapSapLogo()}</div>

      <aside>
        <NavLink
          id={"projects"}
          icon={SvgHandler.Bolt({ width: "15px" })}
          style={{ width: "38px", height: "38px" }}
          action={handleClick}
          selectedLinkId={selected}
        />

        <NavLink
          id={"archives"}
          icon={SvgHandler.Archive({ width: "15px" })}
          style={{ width: "38px", height: "38px" }}
          action={handleClick}
          selectedLinkId={selected}
        />

        <NavLink
          id={"trash"}
          icon={SvgHandler.Dumpster({ width: "17px" })}
          style={{ width: "38px", height: "38px" }}
          action={handleClick}
          selectedLinkId={selected}
        />
      </aside>
    </div>
  );
}

export default SideBar;
