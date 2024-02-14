import React from "react";

import BoardActions from "@/COMPONENTS/MISC/PROJECT/BoardActions";
import Board from "@/COMPONENTS/MISC/PROJECT/Board";
import TaskView from "@/COMPONENTS/MISC/PROJECT/TaskView";
import KanBanHeader from "@/COMPONENTS/MISC/PROJECT/KanBanHeader";

import C from "./style.module.scss";

function KanBan() {
  return (
    <div className={C.KanBan}>
      <KanBanHeader />

      <BoardActions />

      <Board />

      <TaskView />
    </div>
  );
}

export default KanBan;
