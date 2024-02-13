import React from "react";

import propTypes from "prop-types";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function Filter(props) {
  const { label, options, dropRight, onSelected, ...rest } = props;

  const [selected, setSelected] = React.useState(null);
  const [isDropDown, setIsDropDown] = React.useState(false);

  React.useEffect(() => {
    onSelected(selected);
  }, [selected]);

  const handleClick = () => {
    if (options.length > 1) {
      setIsDropDown(!isDropDown);

      return;
    }

    if (selected) {
      setSelected(null);
    } else {
      setSelected(options[0]);
    }
  };

  const handleOptionClick = (e) => {
    if (selected && selected.id === e.id) {
      setSelected(null);

      return;
    }

    setSelected(e);
  };

  return (
    <div
      className={`${C.Filter} ${selected && C.Selected} ${
        options.length === 1 && C.Center
      }`}
      onClick={handleClick}
      {...rest}
    >
      <p>{selected ? selected.label : label}</p>

      {options.length > 1 && (
        <>
          <div className={C.Icon}>{SvgHandler.CarretDown()}</div>

          {isDropDown && (
            <ul
              className={C.DropDown}
              style={{
                left: dropRight ? "initial" : 0,
                right: dropRight ? 0 : "",
              }}
            >
              {options.map((e, i) => (
                <li
                  key={i}
                  className={`${C.Option} ${
                    selected && e.id === selected.id && C.SelectedOption
                  }`}
                  onClick={() => handleOptionClick(e)}
                >
                  <p>{e.label}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

Filter.defaultProps = {
  label: "FILTER",
  options: [],
};

Filter.propTypes = {
  label: propTypes.any.isRequired,
  options: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      label: propTypes.any.isRequired,
    })
  ).isRequired,
  onSelected: propTypes.func,
  dropRight: propTypes.bool,
};

export default Filter;
