import React from "react";

import propTypes from "prop-types";
import { ConfigProvider, Select } from "antd";

function Selector({ elements, label, value, defaultValue, selected, ...rest }) {
  const getOptions = (elements, labelTag, valueTag) => {
    return elements.map((element) => {
      return { label: element[labelTag], value: element[valueTag] };
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: { colorBgContainer: "rgb(252,252,252)", borderRadius: "0.2rem" },
      }}
    >
      <Select
        defaultValue={getOptions(defaultValue, label, value)}
        value={selected}
        options={getOptions(elements, label, value)}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        style={{ userSelect: "none", overflow: "hidden", maxWidth: "200px" }}
        {...rest}
      />
    </ConfigProvider>
  );
}

Selector.defaultProps = {
  elements: [],
  defaultValue: [],
};

Selector.propTypes = {
  elements: propTypes.array,
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  defaultValue: propTypes.array,
};

export default Selector;
