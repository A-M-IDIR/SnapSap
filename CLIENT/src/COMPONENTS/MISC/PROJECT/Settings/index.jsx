import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import _ from "underscore";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import Selector from "@/COMPONENTS/SHARED/Selector";
import DescriptionInput from "@/COMPONENTS/SHARED/DescriptionInput";
import Skeleton from "@/COMPONENTS/SHARED/Skeleton";
import SearchBar from "@/COMPONENTS/SHARED/SearchBar";
import ImageBrowser from "@/COMPONENTS/SHARED/ImageBrowser";
import ImageUploader from "@/COMPONENTS/SHARED/ImageUploader";

import WithSectionLabel from "@/RESOURCES/HOCS/WithSectionLabel";
import WithCopy from "@/RESOURCES/HOCS/WithCopy";
import WithLabel from "@/RESOURCES/HOCS/WithLabel";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import AddKeyHandler from "@/RESOURCES/HANDLERS/AddKeyHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";
import { columns, columnsNoEdit } from "@/RESOURCES/CONSTANTS/ProjectSettings";

import C from "./style.module.scss";

function Settings() {
  const project = useSelector((state) => state.projectSlice.value);
  const [user, setUser] = React.useState(null);
  const [members, setMembers] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************** REQUESTS ********************/
  const updatedProjectMutation = UseRequest({
    onSuccess: () => {
      navigate(QueryParamHandler.UpdateParam("refetch", true));
    },
    onError: () => AlertHandler(dispatch, "Error Updating Project."),
  });

  const updatedGroupMutation = UseRequest({
    onSuccess: () => {
      navigate(QueryParamHandler.UpdateParam("refetch", true));
    },
    onError: () => AlertHandler(dispatch, "Error Updating Group."),
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setMembers(AddKeyHandler(project.members));
  }, []);

  React.useEffect(() => {
    if (!QueryParamHandler.GetParam("member")) {
      setMembers(AddKeyHandler(project.members));

      return;
    }

    setMembers(
      project.members.filter((e) =>
        e.userName.toLowerCase().includes(QueryParamHandler.GetParam("member"))
      )
    );
  }, [QueryParamHandler.GetParam("member")]);

  const handleChangeGroup = (value) => {
    if (project.group) {
      updatedGroupMutation.mutate({
        route: "group",
        method: "PATCH",
        load: {
          groupId: project.group._id,
          deletedProjects: [project._id],
        },
      });
    }

    if (value) {
      updatedGroupMutation.mutate({
        route: "group",
        method: "PATCH",
        load: { groupId: value, addedProjects: [project._id] },
      });
    }
  };

  const handleChange = (updatedData) => {
    updatedProjectMutation.mutate({
      route: "project",
      method: "PATCH",
      load: {
        projectId: project._id,
        updatedData,
      },
    });
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length < 4) {
      AlertHandler(dispatch, "Title Too Short.");

      return;
    }

    if (e.target.value.length > 12) {
      AlertHandler(dispatch, "Title Too Long.");

      return;
    }

    handleChange({ projectName: e.target.value });
  };

  const handleTagChange = (e) => {
    if (e.target.value.length < 2) {
      AlertHandler(dispatch, "Tag Too Short.");

      return;
    }

    if (e.target.value.length > 4) {
      AlertHandler(dispatch, "Tag Too Long.");

      return;
    }

    handleChange({ projectTag: e.target.value });
  };

  return (
    <div className={C.Settings}>
      <div className={C.Header}>
        <div className={C.Banner}>
          <img src={project.projectBanner} style={{ width: "100%" }} />
        </div>

        <div className={C.ProjectImage}>
          <ImageUploader
            onChange={(downloadURL) =>
              handleChange({ projectImage: downloadURL })
            }
            image={project.projectImage}
            fileKey={"PROJECT_IMAGE"}
            contentStyle={{ zIndex: "15px" }}
            imageStyle={{ width: "100%", height: "100%" }}
          />
        </div>

        <div
          className={C.Actions}
          style={{
            position: "absolute",
            left: "10px",
            bottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <WithDropMenu
            DropMenu={(props) => (
              <ImageBrowser
                style={{
                  position: "absolute",
                  bottom: "-5px",
                  transform: "translate(0, 100%)",
                  zIndex: "500",
                }}
                onChange={(value) =>
                  handleChange({ projectBanner: value.urls.regular })
                }
                {...props}
              />
            )}
            withBackDrop={true}
            backDropOpacity={0}
          >
            <Button
              icon={SvgHandler.Pen({ width: "12px" })}
              style={{ width: "30px", minWidth: "30px", height: "30px" }}
              theme={buttonThemes.LightGray}
            />
          </WithDropMenu>

          <WithLabel
            label={"GROUP"}
            isBottom={true}
            labelStyle={{ top: "40px" }}
          >
            <Selector
              elements={project.groups}
              label={"label"}
              value={"_id"}
              defaultValue={project.group ? [project.group] : []}
              allowClear
              showSearch
              placeholder="-"
              variant="filled"
              style={{
                width: "120px",
                height: "30px",
                borderRadius: "0.2rem",
              }}
              className={C.GroupSelect}
              onChange={(value) => handleChangeGroup(value)}
            />
          </WithLabel>
        </div>
      </div>

      <div className={C.Content}>
        <aside>
          <WithSectionLabel label={"NAME"}>
            <input
              className={C.FieldInput}
              defaultValue={project.projectName}
              onChange={_.debounce(handleTitleChange, 1000)}
              style={
                project.lead._id != user?._id
                  ? { cursor: "not-allowed", userSelect: "none" }
                  : {}
              }
              disabled={project.lead._id != user?._id ? true : false}
              spellCheck={false}
            />
          </WithSectionLabel>

          <WithSectionLabel label={"TAG"}>
            <input
              className={C.FieldInput}
              defaultValue={project.projectTag}
              onChange={_.debounce(handleTagChange, 1000)}
              style={
                project.lead._id != user?._id
                  ? {
                      cursor: "not-allowed",
                      userSelect: "none",
                      textTransform: "uppercase",
                    }
                  : { textTransform: "uppercase" }
              }
              disabled={project.lead._id != user?._id ? true : false}
              spellCheck={false}
            />
          </WithSectionLabel>
        </aside>

        <WithSectionLabel label={"ABOUT"}>
          <DescriptionInput
            description={project.description}
            onChange={(description) => {
              handleChange({ description });
            }}
            style={
              project.lead._id != user?._id ? { cursor: "not-allowed" } : {}
            }
            disabled={project.lead._id != user?._id ? true : false}
          />
        </WithSectionLabel>

        <div className={C.Members}>
          <aside>
            <aside style={{ gap: "0.5rem", width: "max-content" }}>
              <SearchBar
                style={{ width: "180px", height: "30px" }}
                onChange={(e) => {
                  if (e.target.value.trim().length === 0) {
                    navigate(QueryParamHandler.RemoveParam("member"));

                    return;
                  }

                  navigate(
                    QueryParamHandler.UpdateParam(
                      "member",
                      e.target.value.trim().toLowerCase()
                    )
                  );
                }}
              />

              <WithLabel
                label={"Lead"}
                style={{ zIndex: "0" }}
                labelStyle={{ top: "-25px" }}
              >
                <Selector
                  elements={project.members}
                  label={"userName"}
                  value={"_id"}
                  defaultValue={[project.lead]}
                  placeholder="-"
                  showSearch
                  disabled={user?._id != project?.lead._id ? true : false}
                  style={{
                    width: "120px",
                    height: "30px",
                    borderRadius: "0.1rem",
                  }}
                  onChange={(value) => {
                    handleChange({ lead: value });
                  }}
                />
              </WithLabel>
            </aside>

            <WithCopy
              content={`${document.location.origin}/home?section=projects&join=${project._id}`}
            >
              <WithLabel
                label={"INVITE-LINK"}
                isBottom={true}
                labelStyle={{ top: "40px" }}
              >
                <Button
                  icon={SvgHandler.Copy({ width: "12px" })}
                  style={{ width: "40px", minWidth: "40px", height: "30px" }}
                />
              </WithLabel>
            </WithCopy>
          </aside>

          <Table
            columns={
              user?._id === project?.lead._id
                ? columns(
                    WithCopy,
                    WithLabel,
                    Button,
                    buttonThemes,
                    project,
                    SvgHandler,
                    user,
                    Skeleton,
                    handleChange,
                    setMembers
                  )
                : columnsNoEdit(WithCopy, WithLabel, Skeleton)
            }
            dataSource={members}
            pagination={false}
            showHeader={false}
            size="small"
            bordered
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
