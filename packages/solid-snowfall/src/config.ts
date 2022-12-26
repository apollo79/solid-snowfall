import { JSX } from "solid-js";

export const snowfallBaseStyle: JSX.CSSProperties = {
  "pointer-events": "none",
  "background-color": "transparent",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

// Target of 60 frames per second
export const targetFrameTime = 1000 / 60;
