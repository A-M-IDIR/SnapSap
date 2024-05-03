import React from "react";

import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import Group from "./Group";
import GroupButton from "./GroupButton";
import GroupPopUp from "./GroupPopUp";

import WithPopUp from "@/RESOURCES/HOCS/WithPopUp";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { setGroups } from "@/CONTEXT/MISC/HOME/GroupSlice";

import C from "./style.module.scss";

function GroupList() {
  const groups = useSelector((state) => state.groupSlice.value);
  const [slidesPerView, setSlidesPerView] = React.useState(0);

  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const getGroupsMutation = UseRequest({
    onSuccess: (result) => {
      dispatch(setGroups(result.data));
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    getGroupsMutation.mutate({
      route: "group/?groupId=all",
      method: "GET",
    });
  }, []);

  React.useEffect(() => {
    refreshSlideView(300);
  }, [groups]);

  const refreshSlideView = (timeOut) => {
    setSlidesPerView(0);

    setTimeout(() => {
      setSlidesPerView("auto");
    }, timeOut);
  };

  return (
    <div className={C.GroupList}>
      <div className={C.Side}>
        <WithPopUp PopElement={GroupPopUp} position={{ x: "center" }}>
          <GroupButton />
        </WithPopUp>
      </div>

      <Swiper
        direction={"horizontal"}
        slidesPerView={slidesPerView}
        freeMode={true}
        scrollbar={false}
        mousewheel={true}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        className={`${C.List} ${"mySwiper"}`}
      >
        <SwiperSlide className={C.Slide}>
          <AnimatePresence mode="popLayout">
            {groups.map((e, i) => (
              <motion.div
                initial={{ transform: "translateY(-5px)", opacity: 0 }}
                animate={{
                  transform: "translateY(0px)",
                  opacity: 1,
                  transition: {
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 800,
                    damping: 30,
                  },
                }}
                exit={{
                  transform: "translateY(-5px)",
                  opacity: 0,
                  transition: {
                    type: "spring",
                    stiffness: 800,
                    damping: 30,
                  },
                }}
                layout
                key={e._id}
              >
                <Group {...e} />
              </motion.div>
            ))}
          </AnimatePresence>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default GroupList;
