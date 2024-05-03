export const columns = (
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
) => {
  return [
    {
      title: "USER",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            height: "40px",
            pointerEvents: "none",
          }}
        >
          {record.avatar ? (
            <div
              style={{
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "32px",
                height: "32px",
                borderRadius: "0.2rem",
                opacity: "0.9",
              }}
            >
              <img
                src={record.avatar}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : (
            <Skeleton
              style={{
                width: "32px",
                height: "32px",
              }}
            />
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20px",
              padding: "0 0.2rem",
              borderRadius: "0.2rem",
              backgroundColor: "rgb(245,245,245)",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                fontWeight: "400",
              }}
            >
              {text}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <WithCopy content={text}>
          <a
            style={{
              textDecoration: "underline",
              textTransform: "uppercase",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            @{text.split("@")[0]}
          </a>
        </WithCopy>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        if (record._id != user._id) {
          return (
            <WithLabel
              label={"DELETE-USER"}
              isBottom={true}
              labelStyle={{
                top: "40px",
                left: "39px",
                backgroundColor: "rgb(255, 185, 0)",
                color: "black",
                fontSize: "0.6rem",
                fontWeight: "600",
              }}
            >
              <Button
                icon={SvgHandler.Bin()}
                theme={buttonThemes.LightGray}
                style={{ width: "30px", height: "30px" }}
                onMouseUp={() => {
                  handleChange({
                    members: project.members.filter((e) => e._id != record._id),
                  });
                  setMembers(
                    project.members.filter((e) => e._id != record._id)
                  );
                }}
              />
            </WithLabel>
          );
        }
      },
    },
  ];
};

export const columnsNoEdit = (WithCopy, WithLabel, Skeleton) => {
  return [
    {
      title: "USER",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            height: "40px",
            pointerEvents: "none",
          }}
        >
          {record.avatar ? (
            <div
              style={{
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "32px",
                height: "32px",
                borderRadius: "0.2rem",
                opacity: "0.9",
              }}
            >
              <img
                src={record.avatar}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : (
            <Skeleton
              style={{
                width: "32px",
                height: "32px",
              }}
            />
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20px",
              padding: "0 0.2rem",
              borderRadius: "0.2rem",
              backgroundColor: "rgb(245,245,245)",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                fontWeight: "400",
              }}
            >
              {text}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <WithCopy content={text} style={{ width: "max-content" }}>
          <WithLabel
            label={"COPY"}
            isBottom={true}
            labelStyle={{ fontSize: "0.55rem" }}
          >
            <a
              style={{
                textDecoration: "underline",
                textTransform: "uppercase",
                cursor: "pointer",
                fontSize: "0.8rem",
                width: "max-content",
              }}
            >
              @{text.split("@")[0]}
            </a>
          </WithLabel>
        </WithCopy>
      ),
    },
  ];
};
