import Skeleton from "@/COMPONENTS/SHARED/Skeleton";

import C from "./style.module.scss";

export const AuthLayout = {
  LoginSkeleton,
  SignUpSkeleton,
  BackGroundSkeleton,
};

function LoginSkeleton() {
  return (
    <div className={C.AuthSkeleton}>
      <header>
        <Skeleton
          style={{
            width: "45px",
            height: "45px",
            opacity: "0.8",
          }}
        />
      </header>

      <div className={C.Form}>
        <div className={C.Field}>
          <Skeleton style={{ width: "100px", height: "24px" }} />

          <Skeleton style={{ width: "100%", height: "45px" }} />
        </div>

        <div className={C.Field}>
          <Skeleton style={{ width: "100px", height: "24px" }} />

          <Skeleton style={{ width: "100%", height: "45px" }} />
        </div>

        <Skeleton
          style={{
            width: "100%",
            height: "48px",
            marginTop: "0.5rem",
          }}
        />
      </div>

      <footer>
        <aside>
          <Skeleton
            style={{
              width: "160px",
              height: "24px",
              opacity: "0.8",
            }}
          />

          <Skeleton
            style={{
              width: "80px",
              height: "24px",
              opacity: "0.8",
            }}
          />
        </aside>

        <Skeleton
          style={{
            width: "120px",
            height: "24px",
            opacity: "0.8",
          }}
        />
      </footer>
    </div>
  );
}

function SignUpSkeleton() {
  return (
    <div className={C.AuthSkeleton}>
      <header>
        <Skeleton
          style={{
            width: "45px",
            height: "45px",
            opacity: "0.8",
          }}
        />
      </header>

      <div className={C.Form}>
        <div className={C.Field}>
          <Skeleton style={{ width: "100px", height: "24px" }} />

          <aside>
            <Skeleton style={{ width: "100%", height: "45px" }} />

            <Skeleton style={{ width: "100%", height: "45px" }} />
          </aside>
        </div>

        <div className={C.Field}>
          <Skeleton style={{ width: "100px", height: "24px" }} />

          <Skeleton style={{ width: "100%", height: "45px" }} />
        </div>

        <div className={C.Field}>
          <Skeleton style={{ width: "100px", height: "24px" }} />

          <Skeleton style={{ width: "100%", height: "45px" }} />
        </div>

        <div className={C.Field}>
          <Skeleton style={{ width: "100px", height: "24px" }} />

          <aside>
            <Skeleton style={{ width: "100%", height: "45px" }} />

            <Skeleton style={{ width: "100%", height: "45px" }} />
          </aside>
        </div>

        <Skeleton
          style={{
            width: "100%",
            height: "48px",
            marginTop: "0.5rem",
          }}
        />
      </div>

      <footer>
        <aside>
          <Skeleton
            style={{
              width: "160px",
              height: "24px",
              opacity: "0.8",
            }}
          />

          <Skeleton
            style={{
              width: "80px",
              height: "24px",
              opacity: "0.8",
            }}
          />
        </aside>

        <Skeleton
          style={{
            width: "120px",
            height: "24px",
            opacity: "0.8",
          }}
        />
      </footer>
    </div>
  );
}

function BackGroundSkeleton() {
  return (
    <div className={C.BackGroundSkeleton}>
      <div className={C.Blur}></div>

      <img
        src={
          "https://images.unsplash.com/photo-1657870329074-e5c29e668d2d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
    </div>
  );
}
