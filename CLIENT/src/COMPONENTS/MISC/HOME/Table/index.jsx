import React from "react";

import { v4 } from "uuid";

import WithDropMenu from "@/RESOURCES/HOCS/WithDropMenu";

import C from "./style.module.scss";

function Table(props) {
  const { cellTypes, labels, data, action } = props;

  const cells = {
    default: (content) => <DefaultCell content={content} key={v4()} />,
    image: (url, text, identifier, item) => (
      <ImageCell
        url={url}
        text={text}
        onClick={() => action(identifier, item)}
        key={v4()}
      />
    ),
    status: (status) => <StatusCell status={status} key={v4()} />,
  };

  return (
    <table className={C.Table} cellSpacing={0}>
      <thead>
        <tr>
          {labels.map((e, i) => (
            <td key={v4()}>
              <div>{e}</div>
            </td>
          ))}

          <td></td>
        </tr>
      </thead>

      <tbody>
        {data.map((item, i) => (
          <tr key={v4()}>
            {Object.values(item)
              .slice(1)
              .map((value, j) =>
                typeof value === "object"
                  ? cells[cellTypes[j].type](
                      Object.entries(value)[0][1],
                      Object.entries(value)[1][1],
                      Object.entries(value),
                      item
                    )
                  : cells[cellTypes[j].type](value)
              )}

            {cellTypes.map(
              (cell) =>
                cell.type === "button" && (
                  <ButtonCell
                    dropMenu={() => cell.dropMenu}
                    icon={cell.icon}
                    key={v4()}
                  />
                )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const ImageCell = (props) => {
  const { text, url, ...rest } = props;

  return (
    <td className={C.ImageCell} {...rest}>
      <div className={C.Image}>
        <img src={url} />
      </div>

      <p>{text}</p>
    </td>
  );
};

const StatusCell = (props) => {
  const { status, ...rest } = props;

  const getColor = (status) => {
    if (status.toLowerCase() === "waiting") return "rgb(180, 200, 255)";

    if (status.toLowerCase() === "started") return "rgb(180, 255, 200)";

    if (status.toLowerCase() === "finished") return "rgb(180, 255, 100)";
  };

  return (
    <td className={C.StatusCell} {...rest}>
      <p style={{ backgroundColor: getColor(status) }}>
        {status.toUpperCase()}
      </p>
    </td>
  );
};

const DefaultCell = (props) => {
  const { content, ...rest } = props;

  return <td {...rest}>{content}</td>;
};

const ButtonCell = (props) => {
  const { dropMenu, action, icon, ...rest } = props;

  return (
    <td className={C.ButtonCell} {...rest}>
      {dropMenu ? (
        <WithDropMenu DropMenu={dropMenu}>
          <div className={C.Button}>{icon}</div>
        </WithDropMenu>
      ) : (
        <div className={C.Button} onClick={action}>
          {icon}
        </div>
      )}
    </td>
  );
};

// ADD THESE LATER
Table.defaultProps = {};

Table.propTypes = {};

export default Table;
