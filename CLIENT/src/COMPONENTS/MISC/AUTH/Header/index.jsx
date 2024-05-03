import React from "react";

import { useNavigate } from "react-router-dom";

import Button from "@/COMPONENTS/SHARED/Button";

import C from "./style.module.scss";

function Header() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  return (
    <div className={C.Header}>
      <div className={C.Side}>
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            style={{
              backgroundColor: "#" + queryParams.get("color"),
            }}
          ></span>
        ))}
      </div>

      <Button
        label={queryParams.get("section") === "register" ? "LOGIN" : "REGISTER"}
        style={{
          height: "24px",
          fontSize: "0.7rem",
          backgroundColor: "#" + queryParams.get("color"),
        }}
        onMouseUp={() => {
          navigate(
            `/auth?section=${
              queryParams.get("section") === "register" ? "login" : "register"
            }&color=${queryParams.get("color")}`
          );
        }}
        key={"BUTTON-LOGIN"}
      />
    </div>
  );
}

export default Header;
