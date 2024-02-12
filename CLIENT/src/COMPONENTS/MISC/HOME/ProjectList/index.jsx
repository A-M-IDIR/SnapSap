import React from "react";

import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import Button from "@/COMPONENTS/SHARED/Button";
import Filter from "@/COMPONENTS/SHARED/Filter";
import SearchBar from "@/COMPONENTS/SHARED/SearchBar";
import Table from "@/COMPONENTS/MISC/HOME/Table";

import WithPopUp from "@/RESOURCES/HOCS/WithPopUp";
import UseResize from "@/RESOURCES/HOOKS/UseResize";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

const projectListTableArgs = {
  cellTypes: [
    { type: "image" },
    { type: "default" },
    { type: "default" },
    { type: "image" },
    { type: "status" },
    { type: "button", dropMenu: <></>, icon: SvgHandler.MenuDots() },
  ],
  labels: ["Name", "Key", "Category", "Lead", "Status"],
  data: [
    {
      id: "4875",
      project: {
        project_image:
          "https://images.unsplash.com/photo-1703635531451-2e32420b164d?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        project_name: "SnapSap",
      },
      project_key: "SNAP",
      category: "N.Z.T",
      lead: {
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        user_name: "UntitledClub",
      },
      status: "waiting",
    },
    {
      id: "2678",
      project: {
        project_image:
          "https://images.unsplash.com/photo-1703635531451-2e32420b164d?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        project_name: "WatchParty",
      },
      project_key: "WAT",
      category: "N.Z.T",
      lead: {
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        user_name: "UntitledClub",
      },
      status: "started",
    },
  ],
};

function ProjectList() {
  const { windowWidth } = UseResize();

  const navigate = useNavigate();

  const handleClick = (identifier, item) => {
    if (identifier[0][0].includes("project")) {
      navigate(`/project?id=${item.id}&section=backlog`);
    }
  };

  return (
    <div className={C.ProjectList}>
      <header>
        <aside>
          <div className={C.Label}>
            <div className={C.Icon}>{SvgHandler.Bolt()}</div>

            <p>PROJECTS</p>
          </div>

          <WithPopUp PopElement={() => <></>}>
            <Button label={"START-NEW"} style={{ height: "34px" }} />
          </WithPopUp>
        </aside>

        <sub>
          <SearchBar label={"SEARCH"} />

          <Filter
            options={[
              { id: "N.Z.T", label: "N.Z.T" },
              { id: "W.A.T", label: "W.A.T" },
            ]}
            label="CATEGORY"
            onSelected={(e) => console.log(e)}
            dropRight={windowWidth < 600 && true}
          />
        </sub>
      </header>

      <Swiper
        direction={"horizontal"}
        slidesPerView={"auto"}
        freeMode={true}
        scrollbar={false}
        mousewheel={true}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        className={`${C.Content} ${"mySwiper"}`}
      >
        <SwiperSlide className={C.Slide}>
          <Table {...projectListTableArgs} action={handleClick} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProjectList;
