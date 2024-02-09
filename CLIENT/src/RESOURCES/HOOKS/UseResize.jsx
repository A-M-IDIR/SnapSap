import { useState, useEffect } from "react";

export default function UseResize() {
  const [windowWidth, setWindowWidth] = useState(null);
  const [windowHeight, setWindowHeight] = useState(null);

  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);

    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, [windowWidth, windowHeight]);

  return { windowWidth, windowHeight };
}
