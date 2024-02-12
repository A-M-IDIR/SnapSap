import Skeleton from "@/COMPONENTS/SHARED/Skeleton";

import C from "./style.module.scss";

export const HomeLayout = {
  SideBarSkeleton,
  NavBarSkeleton,
  ProjectListSkeleton,
  ArchiveListSkeleton,
  TrashListSkeleton,
};

function SideBarSkeleton() {
  return (
    <div className={C.SideBarSkeleton}>
      <Skeleton
        style={{
          width: "38px",
          height: "38px",
          backgroundColor: "white",
        }}
      />

      <aside>
        <Skeleton
          style={{
            width: "38px",
            height: "38px",
            backgroundColor: "white",
          }}
        />

        <Skeleton
          style={{
            width: "38px",
            height: "38px",
            backgroundColor: "white",
          }}
        />

        <Skeleton
          style={{
            width: "38px",
            height: "38px",
            backgroundColor: "white",
          }}
        />
      </aside>
    </div>
  );
}

function NavBarSkeleton() {
  return (
    <div className={C.NavBarSkeleton}>
      <aside>
        <Skeleton style={{ width: "120px", height: "35px" }} />

        <Skeleton style={{ width: "120px", height: "35px" }} />
      </aside>

      <aside>
        <Skeleton style={{ width: "35px", height: "35px" }} />

        <Skeleton
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </aside>
    </div>
  );
}

function ProjectListSkeleton() {
  return (
    <div className={C.ListSkeleton}>
      <header>
        <aside>
          <Skeleton style={{ width: "160px", height: "38px" }} />

          <Skeleton style={{ width: "120px", height: "38px" }} />
        </aside>

        <sub>
          <Skeleton style={{ width: "280px", height: "38px" }} />

          <Skeleton style={{ width: "130px", height: "38px" }} />
        </sub>
      </header>

      <Skeleton style={{ width: "100%", height: "100px" }} />
    </div>
  );
}

function ArchiveListSkeleton() {
  return (
    <div className={C.ListSkeleton}>
      <header>
        <aside>
          <Skeleton style={{ width: "160px", height: "38px" }} />
        </aside>

        <sub>
          <Skeleton style={{ width: "280px", height: "38px" }} />

          <Skeleton style={{ width: "130px", height: "38px" }} />
        </sub>
      </header>

      <Skeleton style={{ width: "100%", height: "100px" }} />
    </div>
  );
}

function TrashListSkeleton() {
  return (
    <div className={C.ListSkeleton}>
      <header>
        <aside>
          <Skeleton style={{ width: "160px", height: "38px" }} />
        </aside>

        <sub>
          <Skeleton style={{ width: "280px", height: "38px" }} />

          <Skeleton style={{ width: "130px", height: "38px" }} />
        </sub>
      </header>

      <Skeleton style={{ width: "100%", height: "100px" }} />
    </div>
  );
}
