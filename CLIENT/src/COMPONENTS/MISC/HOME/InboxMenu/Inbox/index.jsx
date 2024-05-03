import React from "react";

import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";
import Skeleton from "@/COMPONENTS/SHARED/Skeleton";

import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";

import C from "./style.module.scss";

function Inbox({
  _id,
  sender,
  project,
  issue,
  createdAt,
  index,
  inboxes,
  setInboxes,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************** REQUESTS ********************/
  const deleteInboxMutation = UseRequest({
    onSuccess: (result) => {
      setInboxes(inboxes.filter((e) => e._id != _id));
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });

  const updateProjectMutation = UseRequest({
    onSuccess: () => {
      deleteInboxMutation.mutate({
        route: "user/inbox",
        method: "DELETE",
        load: {
          inboxes: [_id],
        },
      });

      AlertHandler({ dispatch, message: "Accepted !", type: "success" });
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  /******************** REQUESTS ********************/

  const handleAccept = () => {
    updateProjectMutation.mutate({
      route: "project",
      method: "PATCH",
      load: {
        projectId: project._id,
        addedMembers: [sender._id],
      },
    });
  };

  const handleDeny = () => {
    deleteInboxMutation.mutate({
      route: "user/inbox",
      method: "DELETE",
      load: {
        inboxes: [_id],
      },
    });
  };

  const getTimeSinceReceived = () => {
    const now = dayjs();

    const daysAgo = now.diff(createdAt, "day");
    const hoursAgo = now.diff(createdAt, "hour");

    if (daysAgo > 0) {
      return `${daysAgo} ${daysAgo == 1 ? "DAY-AGO" : "DAYS-AGO"}`;
    }

    if (hoursAgo > 0) {
      return `${hoursAgo} ${hoursAgo == 1 ? "H-AGO" : "HOURS-AGO"}`;
    }

    return "MOMENTS AGO";
  };

  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-5px)" }}
      animate={{
        opacity: 1,
        transform: "translateY(0px)",
        transition: { delay: index * 0.1, ease: [0.8, 0, 0, 1], duration: 0.3 },
      }}
      exit={{
        opacity: 0,
        transform: "translateY(-5px)",
        transition: { ease: [0.8, 0, 0, 1], duration: 0.3 },
      }}
      whileHover={{
        backgroundColor: "rgb(250,250,250)",
      }}
      className={C.Inbox}
    >
      <div className={C.InboxContent}>
        <div className={C.Profile}>
          {sender?.avatar ? (
            <img src={sender.avatar} />
          ) : (
            <Skeleton
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </div>

        <aside>
          <div className={C.Message}>
            <p className={C.HighLights}>{sender.userName}</p>

            <p>WANTS TO BE PART OF</p>

            <p
              className={C.Link}
              onClick={() =>
                navigate(`/project?id=${project._id}&section=backlog`)
              }
            >
              {project.projectName}
            </p>
          </div>

          <p className={C.TimeStamp}>{getTimeSinceReceived()}</p>
        </aside>
      </div>

      <div className={C.Actions}>
        <Button
          label={"ACCEPT"}
          style={{ height: "24px", padding: "0.5rem", fontSize: "0.64rem" }}
          onMouseDown={handleAccept}
        />

        <Button
          label={"DENY"}
          style={{
            height: "24px",
            padding: "0.5rem",
            fontSize: "0.64rem",
            fontWeight: "700",
          }}
          theme={buttonThemes.LightGray}
          onMouseDown={handleDeny}
        />
      </div>
    </motion.div>
  );
}

export default Inbox;
