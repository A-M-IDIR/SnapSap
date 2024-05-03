import React from "react";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import WithCopy from "@/RESOURCES/HOCS/WithCopy";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { demoInfo } from "@/RESOURCES/CONSTANTS/AuthForm";

import C from "./style.module.scss";

function DemoInfo({ layer }) {
  const queryParams = new URLSearchParams(location.search);

  return (
    <div className={C.DemoInfo} ref={layer}>
      <div className={C.Label}>DEMO-ACCOUNT</div>

      <WithCopy content={demoInfo.email}>
        <WithLabel label={"COPY"} labelStyle={{ top: "-25px" }}>
          <div className={C.Field}>
            <p>@JohnDoe</p>

            <div className={C.Icon}>
              {SvgHandler.Email(
                { width: "14px" },
                "#" + queryParams.get("color")
              )}
            </div>
          </div>
        </WithLabel>
      </WithCopy>

      <WithCopy content={demoInfo.password}>
        <WithLabel label={"COPY"} isBottom={true} labelStyle={{ top: "40px" }}>
          <div className={C.Field}>
            <p>DemoPass123</p>

            <div className={C.Icon}>
              {SvgHandler.Password(
                { width: "14px" },
                "#" + queryParams.get("color")
              )}
            </div>
          </div>
        </WithLabel>
      </WithCopy>
    </div>
  );
}

export default DemoInfo;
