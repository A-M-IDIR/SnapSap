import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import { setGroups } from "@/CONTEXT/MISC/HOME/GroupSlice";

import C from "./style.module.scss";

function Group({ _id, label, style, color }) {
  const groups = useSelector((state) => state.groupSlice.value);
  const [selected, setSelected] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************** REQUESTS ********************/
  const deleteGroupMutation = UseRequest({
    onSuccess: () => {
      let updatedGroups = [...groups];

      updatedGroups = updatedGroups.filter((e) => e._id != _id);

      dispatch(setGroups(updatedGroups));
      AlertHandler({ dispatch, message: "Deleted !", type: "success" });
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    let groups = QueryParamHandler.GetParam("group")
      ? QueryParamHandler.GetParam("group").split(",")
      : [];

    if (selected) {
      groups.push(_id);
      navigate(QueryParamHandler.UpdateParam("group", groups));

      return;
    }

    groups = groups.filter((e) => e != _id);

    if (groups.length === 0) {
      navigate(QueryParamHandler.RemoveParam("group"));

      return;
    }

    navigate(QueryParamHandler.UpdateParam("group", groups));
  }, [selected]);

  const handleDeleteGroup = () => {
    deleteGroupMutation.mutate({
      route: `group?groupId=${_id}`,
      method: "DELETE",
    });
  };

  return (
    <div
      className={`${C.Group} ${selected && C.GroupSelected}`}
      style={{
        backgroundColor: selected ? "rgb(235,235,235)" : "rgb(242, 242, 242)",
      }}
    >
      <div className={C.Content} onClick={() => setSelected(!selected)}>
        <div className={C.Icon}>
          {SvgHandler.Folder({ width: "18px" }, selected ? color : "#A4A4A4")}
        </div>

        <p className={C.Label}>{label}</p>
      </div>

      <Button
        icon={SvgHandler.Bin({ width: "10px" })}
        style={{
          position: "absolute",
          top: "8px",
          right: "10px",
          zIndex: "1",
          width: "24px",
          height: "24px",
          marginRight: "-0.2rem",
        }}
        theme={buttonThemes.Red}
        onMouseUp={handleDeleteGroup}
      />

      <div className={C.Style}>
        {groupStyles[style](selected ? color : "rgb(220,220,220)")}
      </div>
    </div>
  );
}

const groupStyles = {
  1: (fill) => {
    return (
      <svg viewBox="0 0 10798 7079">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1911.04 -213.899C2822.75 -56.8577 3695.91 -651.26 3884.09 -1557.06L3884.6 -1556.96C3727.56 -645.247 4321.96 227.905 5227.76 416.085L5227.66 416.6C4315.95 259.559 3442.8 853.962 3254.62 1759.76L3254.1 1759.66C3411.14 847.95 2816.74 -25.2035 1910.94 -213.384L1911.04 -213.899Z"
          fill={fill}
          style={{ opacity: 0.4 }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6194.82 775.314C6692.06 860.963 7168.27 536.781 7270.9 42.7672L7271.18 42.8205C7185.53 540.061 7509.72 1016.27 8003.73 1118.9L8003.68 1119.18C7506.44 1033.53 7030.23 1357.72 6927.6 1851.73L6927.31 1851.68C7012.96 1354.44 6688.78 878.227 6194.77 775.595L6194.82 775.314Z"
          fill={fill}
          style={{ opacity: 0.4 }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7229.13 5619.01C6558.12 6255.9 5501.89 6246.44 4842.39 5597.64L4842.02 5598C5478.9 6269.02 5469.44 7325.25 4820.24 7984.74L4820.83 7984.93L7216.13 5632.15L7216.6 5632.63C7220.88 5628.2 7225.17 5623.79 7229.5 5619.39L7229.13 5619.01Z"
          fill={fill}
          style={{ opacity: 0.4 }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4820.82 7984.93L4821.01 7985.12C5492.02 7348.23 6548.25 7357.69 7207.74 8006.5L7208.12 8006.13C6571.23 7335.12 6580.29 6278.89 7229.49 5619.39L7229.13 5619.02L7229.31 5619.2L4820.82 7984.93Z"
          fill={fill}
          style={{ opacity: 0.2 }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12604.4 3803.7C11385.2 3454.52 10661.2 2200.5 10968.4 970.015L10967.7 969.829C10618.5 2189.07 9364.5 2913.07 8134.02 2605.86L8133.93 2606.21L12579.9 3797.49L12579.6 3798.39C12587.8 3800.35 12596 3802.35 12604.2 3804.39L12604.4 3803.7Z"
          fill={fill}
          style={{ opacity: 0.4 }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8133.92 2606.2L8133.83 2606.55C9353.06 2955.74 10077.1 4209.76 9769.86 5440.24L9770.55 5440.42C10119.7 4221.19 11373.8 3497.18 12604.2 3804.39L12604.4 3803.7L12604.3 3804.04L8133.92 2606.2Z"
          fill={fill}
          style={{ opacity: 0.2 }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2726.1 3131.4C1521.74 3528.86 217.562 2899.66 -220.92 1709.62L-221.598 1709.86C175.86 2914.22 -453.335 4218.4 -1643.37 4656.88L-1643.25 4657.22L2702.3 3140.09L2702.6 3140.96C2710.49 3137.96 2718.4 3135 2726.34 3132.07L2726.1 3131.4Z"
          fill={fill}
          style={{ opacity: 0.4 }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-1643.26 4657.22L-1643.14 4657.56C-438.779 4260.1 865.396 4889.29 1303.88 6079.33L1304.56 6079.1C907.097 4874.73 1536.29 3570.56 2726.33 3132.08L2726.09 3131.4L2726.21 3131.74L-1643.26 4657.22Z"
          fill={fill}
          style={{ opacity: 0.2 }}
        />
      </svg>
    );
  },
  2: (fill) => {
    return (
      <svg viewBox="0 0 10798 7079">
        <path
          d="M2656.49 1689.5C2549.39 1874.99 2406.81 2037.57 2236.89 2167.96C2066.96 2298.35 1873.02 2393.99 1666.13 2449.43C1459.25 2504.86 1243.46 2519 1031.11 2491.05C818.757 2463.09 613.99 2393.58 428.499 2286.49C243.009 2179.39 80.4279 2036.82 -49.9602 1866.89C-180.348 1696.96 -275.991 1503.02 -331.426 1296.13C-386.861 1089.25 -401.004 873.465 -373.047 661.112C-345.091 448.758 -275.581 243.99 -168.488 58.5L1244 874L2656.49 1689.5Z"
          fill={fill}
          style={{ opacity: 0.4 }}
        />
        <path
          d="M2656.49 1689.5C2872.77 1314.89 2931.38 869.695 2819.42 451.866C2707.47 34.0376 2434.11 -322.203 2059.5 -538.487C1684.88 -754.771 1239.69 -813.382 821.865 -701.425C404.037 -589.468 47.7959 -316.115 -168.488 58.4999L1244 874L2656.49 1689.5Z"
          fill={fill}
          style={{ opacity: 0.2 }}
        />
        <path
          d="M9003.1 7479.43C9176.89 7178.43 9223.98 6820.72 9134.02 6484.99C9044.07 6149.27 8824.43 5863.03 8523.43 5689.25C8222.43 5515.47 7864.72 5468.37 7528.99 5558.33C7193.27 5648.29 6907.03 5867.92 6733.25 6168.93L7868.18 6824.18L9003.1 7479.43Z"
          fill={fill}
          style={{ opacity: 0.4 }}
        />
        <path
          d="M9003.1 7479.75C8917.05 7628.79 8802.49 7759.42 8665.96 7864.19C8529.42 7968.96 8373.59 8045.8 8207.36 8090.35C8041.13 8134.89 7867.75 8146.25 7697.12 8123.79C7526.5 8101.33 7361.97 8045.48 7212.93 7959.43C7063.89 7873.38 6933.25 7758.82 6828.49 7622.28C6723.72 7485.75 6646.87 7329.92 6602.33 7163.68C6557.79 6997.45 6546.42 6824.07 6568.89 6653.45C6591.35 6482.82 6647.2 6318.29 6733.25 6169.25L7868.18 6824.5L9003.1 7479.75Z"
          fill={fill}
          style={{ opacity: 0.2 }}
        />
        <circle
          cx="10798"
          cy="4074"
          r="1686"
          fill={fill}
          style={{ opacity: 0.2 }}
        />
        <path
          d="M7477.42 -320.584C7353.94 -534.459 7150.55 -690.521 6912 -754.44C6673.46 -818.358 6419.29 -784.896 6205.42 -661.415C5991.54 -537.935 5835.48 -334.55 5771.56 -96.004C5707.64 142.542 5741.1 396.71 5864.58 610.585L6671 145L7477.42 -320.584Z"
          fill={fill}
          style={{ opacity: 0.4 }}
        />
        <path
          d="M7477.42 -320.584C7600.9 -106.709 7634.36 147.458 7570.44 386.004C7506.52 624.551 7350.46 827.935 7136.58 951.416C6922.71 1074.9 6668.54 1108.36 6430 1044.44C6191.45 980.522 5988.07 824.459 5864.58 610.585L6671 145L7477.42 -320.584Z"
          fill={fill}
          style={{ opacity: 0.2 }}
        />
        <circle
          cx="1535"
          cy="5221"
          r="1098"
          fill={fill}
          style={{ opacity: 0.2 }}
        />
      </svg>
    );
  },
};

Group.defaultProps = {
  label: "GRP",
  style: 1,
  projects: [],
};

export default Group;
