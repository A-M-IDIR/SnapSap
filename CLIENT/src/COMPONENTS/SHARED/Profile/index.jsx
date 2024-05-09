import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import ImageUploader from "@/COMPONENTS/SHARED/ImageUploader";
import Info from "./Info";

import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import WithSectionLabel from "@/RESOURCES/HOCS/WithSectionLabel";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { TokenHandler } from "@/RESOURCES/HANDLERS/TokenHandler";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function Profile() {
  const [avatar, setAvatar] = React.useState(null);
  const [banner, setBanner] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const updatedUserMutation = UseRequest({
    onSuccess: (result) => {
      localStorage.setItem("user", JSON.stringify(result.data));
      AlertHandler({ dispatch, message: "Updated !", type: "success" });
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setAvatar(user?.avatar);
    setBanner(user?.banner);
  }, []);

  const handleLogOut = () => {
    TokenHandler.clearToken();

    setTimeout(() => {
      navigate("/auth?section=login&out=true");
    }, 200);
  };

  return (
    <div className={C.Profile}>
      <div className={C.Header}>
        <div className={C.Big}>
          <ImageUploader
            onChange={(downloadURL) => {
              setBanner(downloadURL);
              updatedUserMutation.mutate({
                route: "user",
                method: "PATCH",
                load: {
                  updatedData: { banner: downloadURL },
                },
              });
            }}
            fileKey={"BANNER"}
            image={banner}
            contentStyle={{ zIndex: "10px" }}
            imageStyle={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className={C.ProfileImage}>
          <ImageUploader
            onChange={(downloadURL) => {
              setAvatar(downloadURL);
              updatedUserMutation.mutate({
                route: "user",
                method: "PATCH",
                load: {
                  updatedData: { avatar: downloadURL },
                },
              });
            }}
            image={avatar}
            fileKey={"AVATAR"}
            contentStyle={{ zIndex: "15px" }}
            imageStyle={{ width: "100%", height: "100%" }}
          />
        </div>

        <div
          className={C.Actions}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            display: "flex",
            justifyContent: "space-between",
            gap: "0.5rem",
            padding: "1rem",
            zIndex: "50px",
          }}
        >
          {/* <WithLabel
            label={"DELETE-ACCOUNT"}
            labelStyle={{
              backgroundColor: "rgb(255, 185, 0)",
              color: "black",
              fontWeight: "600",
            }}
          >
            <Button
              icon={SvgHandler.Ban()}
              style={{
                width: "32px",
                height: "32px",
              }}
              theme={buttonThemes.ExtraRed}
            />
          </WithLabel> */}

          <WithLabel label={"LOG-OUT"}>
            <Button
              icon={SvgHandler.LogOut({ width: "13px" })}
              style={{
                width: "32px",
                height: "32px",
              }}
              theme={buttonThemes.ExtraRed}
              onMouseUp={handleLogOut}
            />
          </WithLabel>
        </div>
      </div>

      <div className={C.Content}>
        <WithSectionLabel
          label={"USER-NAME"}
          labelStyle={{
            fontSize: "0.65rem",
            backgroundColor: "rgb(235,235,235)",
          }}
        >
          <Info
            defaultInfo={JSON.parse(localStorage.getItem("user"))?.userName}
            infoLabel={"USER-NAME"}
            infoKey={"userName"}
            infoType={"text"}
          />
        </WithSectionLabel>

        <WithSectionLabel
          label={"EMAIL"}
          labelStyle={{
            fontSize: "0.65rem",
            backgroundColor: "rgb(235,235,235)",
          }}
        >
          <Info
            defaultInfo={JSON.parse(localStorage.getItem("user"))?.email}
            infoLabel={"EMAIL"}
            infoKey={"email"}
            infoType={"email"}
          />
        </WithSectionLabel>

        <WithSectionLabel
          label={"PASSWORD"}
          labelStyle={{
            fontSize: "0.65rem",
            backgroundColor: "rgb(235,235,235)",
          }}
        >
          <Info
            defaultInfo={"***************"}
            infoLabel={"NEW-PASS"}
            infoKey={"password"}
            infoType={"password"}
          />
        </WithSectionLabel>
      </div>
    </div>
  );
}

export default Profile;
