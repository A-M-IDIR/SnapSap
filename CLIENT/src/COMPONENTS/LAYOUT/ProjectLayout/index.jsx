import Skeleton from "@/COMPONENTS/SHARED/Skeleton";

import C from "./style.module.scss";

export const ProjectLayout = {
  ActionBarSkeleton,
  ProjectNavLargeSkeleton,
  ProjectNavSmallSkeleton,
  BoardSkeleton,
  BackLogSkeleton,
  ProjectSettingsSkeleton,
};

function ActionBarSkeleton() {
  return (
    <div className={C.ActionBarSkeleton}>
      <aside>
        <Skeleton
          style={{ width: "38px", height: "38px", backgroundColor: "#366AB6" }}
        />

        <sub>
          <Skeleton
            style={{
              width: "38px",
              height: "38px",
              backgroundColor: "#366AB6",
            }}
          />

          <Skeleton
            style={{
              width: "38px",
              height: "38px",
              backgroundColor: "#366AB6",
            }}
          />
        </sub>
      </aside>

      <Skeleton
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#366AB6",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

function ProjectNavLargeSkeleton() {
  return (
    <div className={C.ProjectNavLargeSkeleton}>
      <Skeleton
        style={{
          width: "100%",
          height: "60px",
          backgroundColor: "white",
        }}
      />

      <aside>
        <Skeleton
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: "white",
          }}
        />

        <Skeleton
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: "white",
          }}
        />

        <Skeleton
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: "white",
          }}
        />
      </aside>
    </div>
  );
}

function ProjectNavSmallSkeleton() {
  return (
    <div className={C.ProjectNavSmallSkeleton}>
      <Skeleton
        style={{
          width: "150px",
          height: "34px",
          backgroundColor: "white",
        }}
      />

      <aside>
        <Skeleton
          style={{
            width: "100px",
            height: "34px",
            backgroundColor: "white",
          }}
        />

        <Skeleton
          style={{
            width: "100px",
            height: "34px",
            backgroundColor: "white",
          }}
        />
      </aside>
    </div>
  );
}

function BoardSkeleton() {
  return (
    <div className={C.BoardSkeleton}>
      <header>
        <div className={C.Head}>
          <Skeleton style={{ width: "300px", height: "30px" }} />

          <Skeleton style={{ width: "180px", height: "40px" }} />
        </div>

        <sub>
          <aside>
            <Skeleton
              style={{ width: "250px", minWidth: "250px", height: "34px" }}
            />

            <sub>
              <ul>
                <Skeleton style={{ width: "60px", height: "34px" }} />
              </ul>

              <Skeleton style={{ width: "34px", height: "34px" }} />
            </sub>
          </aside>

          <aside>
            <Skeleton style={{ width: "120px", height: "34px" }} />

            <Skeleton style={{ width: "100px", height: "34px" }} />
          </aside>
        </sub>
      </header>

      <section>
        <Skeleton
          style={{
            width: "100%",
            minWidth: "250px",
            maxWidth: "300px",
            height: "200px",
            minheight: "200px",
            maxHeight: "100%",
          }}
        />

        <Skeleton
          style={{
            width: "100%",
            minWidth: "250px",
            maxWidth: "300px",
            height: "200px",
            minheight: "200px",
            maxHeight: "100%",
          }}
        />

        <Skeleton
          style={{
            width: "100%",
            minWidth: "250px",
            maxWidth: "300px",
            height: "200px",
            minheight: "200px",
            maxHeight: "100%",
          }}
        />

        <Skeleton
          style={{
            width: "100%",
            minWidth: "250px",
            maxWidth: "300px",
            height: "200px",
            minheight: "200px",
            maxHeight: "100%",
          }}
        />
      </section>
    </div>
  );
}

function BackLogSkeleton() {
  return (
    <div className={C.BackLogSkeleton}>
      <header>
        <Skeleton style={{ width: "300px", height: "30px" }} />

        <Skeleton style={{ width: "150px", height: "40px" }} />
      </header>

      <div className={C.Head}>
        <aside>
          <Skeleton style={{ width: "250px", height: "35px" }} />

          <sub>
            <ul>
              <Skeleton style={{ width: "45px", height: "35px" }} />

              <Skeleton style={{ width: "45px", height: "35px" }} />
            </ul>

            <Skeleton style={{ width: "35px", height: "35px" }} />
          </sub>
        </aside>

        <Skeleton style={{ width: "120px", height: "35px" }} />
      </div>

      <Skeleton style={{ width: "100%", height: "100px" }} />
    </div>
  );
}

function ProjectSettingsSkeleton() {
  return (
    <div className={C.ProjectSettingsSkeleton}>
      <aside>
        <Skeleton style={{ width: "100px", height: "30px" }} />

        <Skeleton style={{ width: "100%", height: "40px" }} />

        <div className={C.Line}></div>

        <ul>
          <Skeleton style={{ width: "100%", height: "40px" }} />

          <Skeleton style={{ width: "100%", height: "40px" }} />
        </ul>

        <div className={C.Line}></div>

        <Skeleton style={{ width: "100%", height: "40px" }} />
      </aside>

      <div className={C.Settings}>
        <header>
          <Skeleton style={{ width: "300px", height: "30px" }} />

          <Skeleton style={{ width: "150px", height: "40px" }} />
        </header>

        <Skeleton style={{ width: "100%", height: "500px" }} />
      </div>
    </div>
  );
}
