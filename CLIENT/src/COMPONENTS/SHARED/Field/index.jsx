import React from "react";

import propTypes from "prop-types";

import C from "./style.module.scss";

function Field(props) {
  const { label, type, value, onChange, required } = props;

  return (
    <div className={C.Field}>
      <p className={C.Label}>{label}</p>

      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

Field.propTypes = {
  label: propTypes.string,
  type: propTypes.string,
  value: propTypes.any,
  required: propTypes.bool,
  onChange: propTypes.func,
};

Field.defaultProps = {
  label: "-",
  type: "text",
  value: "",
  required: false,
  onChange: () => {},
};

export default Field;
