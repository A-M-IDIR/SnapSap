import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import NewSprint from "./NewSprint";
import EndSprint from "./EndSprint";

import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

import C from "./style.module.scss";

function Sprint() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sprint, setSprint] = React.useState(null);
  const [sprintInfo, setSprintInfo] = React.useState(null);

  /******************** REQUESTS ********************/
  const getSprintMutation = UseRequest({
    onSuccess: (result) => {
      setSprint(result.data);
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });

  const getSprintInfoMutation = UseRequest({
    onSuccess: (result) => {
      setSprintInfo(result.data);
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    const sprint = QueryParamHandler.GetParam("sprint");

    if (!sprint || sprint === "new") {
      navigate(QueryParamHandler.RemoveParam("end"));

      return;
    }

    getSprintMutation.mutate({
      route: `log/find?sprintId=${QueryParamHandler.GetParam("sprint")}`,
      method: "GET",
    });

    getSprintInfoMutation.mutate({
      route: `log/details?logId=${QueryParamHandler.GetParam("sprint")}`,
      method: "GET",
    });
  }, [QueryParamHandler.GetParam("sprint")]);

  return (
    <AnimatePresence>
      {QueryParamHandler.GetParam("sprint") &&
        !getSprintInfoMutation.isLoading &&
        !getSprintMutation.isLoading && (
          <motion.div
            className={C.Sprint}
            initial={{ opacity: 0, transform: "translateY(-5px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-5px)" }}
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
          >
            {QueryParamHandler.GetParam("end") && sprint && sprintInfo && (
              <EndSprint {...sprint} {...sprintInfo} />
            )}

            {!QueryParamHandler.GetParam("end") &&
              ((sprint && sprintInfo) ||
                QueryParamHandler.GetParam("sprint") === "new") && (
                <NewSprint sprint={sprint} />
              )}
          </motion.div>
        )}
    </AnimatePresence>
  );
}

export default Sprint;
