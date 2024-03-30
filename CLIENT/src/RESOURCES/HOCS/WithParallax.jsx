import React from "react";

import { AnimatePresence, motion } from "framer-motion";

function WithParallax(props) {
  const { speed, reverse, children, isAbsolute } = props;

  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const layer = React.useRef(null);

  const parallax = (e) => {
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;

    if (isAbsolute) {
      layer.current.style.transform = `translateX(${
        reverse ? -x : x
      }px)  translateY(${reverse ? -y : y}px)`;
    } else {
      setPos({ x, y });
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", parallax);

    return () => {
      document.removeEventListener("mousemove", parallax);
    };
  }, []);

  return (
    <AnimatePresence>
      {isAbsolute ? (
        React.cloneElement(children, { layer })
      ) : (
        <motion.div
          animate={{ x: -pos.x + 8, y: -pos.y + 3 }}
          transition={{ duration: 0.2 }}
          style={{ position: "relative", zIndex: 10 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WithParallax;
