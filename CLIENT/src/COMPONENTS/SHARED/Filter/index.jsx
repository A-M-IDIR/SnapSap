import React from "react";

import { motion, AnimatePresence } from "framer-motion";
import propTypes from "prop-types";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function Filter({ label, options, dropRight, onSelected, ...rest }) {
  const [action, setAction] = React.useState(null);
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
    <motion.div
      className={`${C.Filter} ${selected && C.Selected} ${
        options.length === 1 && C.Center
      }`}
      animate={action == "active" ? { y: 3 } : {}}
      transition={{ type: "spring", stiffness: 800, damping: 30 }}
      {...rest}
    >
      <motion.p
        animate={
          action == "hover" ? { y: -4 } : action == "active" ? { y: 4 } : {}
        }
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
        className={C.FilterLabel}
      >
        {selected ? selected.label : label}
      </motion.p>

      <div
        className={C.HitBox}
        onMouseEnter={() => setAction("hover")}
        onMouseLeave={() => setAction(null)}
        onMouseDown={() => {
          setAction("active");
          handleClick();
        }}
        onMouseUp={() => setAction("hover")}
      ></div>

      {options.length > 1 && (
        <>
          <motion.div
            className={C.Icon}
            animate={
              action == "hover" ? { y: -2 } : action == "active" ? { y: 2 } : {}
            }
            transition={{ type: "spring", stiffness: 800, damping: 30 }}
          >
            {SvgHandler.CarretDown({ width: "17px" })}
          </motion.div>

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, transform: "translateX(-100%)" }}
                animate={{ opacity: 1, transform: "translateX(-130%)" }}
                exit={{ opacity: 0, transform: "translateX(-100%)" }}
                transition={{ ease: [0.8, 0, 0, 1], duration: 0.2 }}
                onClick={() => setSelected(null)}
                key={"CLEAR"}
                className={C.ClearButton}
              >
                {SvgHandler.Cross({ width: "12px" })}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isDropDown && (
              <>
                <div
                  className={C.BackDrop}
                  onClick={() => setIsDropDown(false)}
                ></div>

                <motion.ul
                  className={C.DropDown}
                  style={{
                    left: dropRight ? "initial" : 0,
                    right: dropRight ? 0 : "",
                  }}
                  initial={{
                    opacity: 0,
                    transform: "translateY(110%)",
                  }}
                  animate={{
                    opacity: 1,
                    transform: "translateY(100%)",
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: [0.8, 0, 0, 1], duration: 0.2 }}
                  key={"DROP-MENU"}
                >
                  {options.map((e, i) => (
                    <motion.li
                      key={i}
                      className={`${C.Option} ${
                        selected && e.id === selected.id && C.SelectedOption
                      }`}
                      onClick={() => handleOptionClick(e)}
                      initial={{ opacity: 0, transform: "translateY(5px)" }}
                      animate={{
                        opacity: 1,
                        transform: "translateY(0)",
                        transition: { delay: i * 0.1 },
                      }}
                      exit={{ opacity: 0 }}
                    >
                      <p>{e.label}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
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
