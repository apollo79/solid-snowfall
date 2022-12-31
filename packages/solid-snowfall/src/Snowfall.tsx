import { Accessor, Component, createMemo, createSignal, JSX, onCleanup, onMount, splitProps } from "solid-js";

import { destructure } from "@solid-primitives/destructure";
import { createElementSize } from "@solid-primitives/resize-observer";

import { targetFrameTime } from "./config";
import { createSnowFallStyle } from "./hooks";
import { createDeepCompareMemo, createSnowFlakes } from "./hooks";
import { defaultConfig, SnowflakeProps } from "./Snowflake";

export interface SnowfallProps extends Partial<SnowflakeProps> {
  /**
   * The number of snowflakes to be rendered.
   *
   * The default value is 150.
   */
  snowflakeCount?: number;
  /**
   * Any style properties that will be passed to the canvas element.
   */
  style?: JSX.CSSProperties;
}

const Snowfall: Component<SnowfallProps> = (props) => {
  const [split] = splitProps(props, [
    "color",
    "changeFrequency",
    "radius",
    "speed",
    "wind",
    "rotationSpeed",
    "snowflakeCount",
    "images",
    "style",
  ]);

  const {
    color = () => defaultConfig.color,
    changeFrequency = () => defaultConfig.changeFrequency,
    radius = () => defaultConfig.radius,
    speed = () => defaultConfig.speed,
    wind = () => defaultConfig.wind,
    rotationSpeed = () => defaultConfig.rotationSpeed,
    snowflakeCount = () => 150,
    images,
    style,
  } = destructure(split);

  const mergedStyle = createSnowFallStyle(style);

  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement>(null as unknown as HTMLCanvasElement);
  const ctx = createMemo(() => canvasRef()?.getContext("2d"));

  const canvasSize = createElementSize(canvasRef);

  let animationFrame = 0;

  let lastUpdate = Date.now();

  const config = createDeepCompareMemo(() => ({
    color: color(),
    changeFrequency: changeFrequency(),
    radius: radius(),
    speed: speed(),
    wind: wind(),
    rotationSpeed: rotationSpeed(),
    images: images?.(),
  }));

  const snowflakes = createSnowFlakes(canvasRef, snowflakeCount as Accessor<number>, config);

  // no need for reactivity here
  const render = (framesPassed = 1) => {
    if (canvasRef()) {
      // Update the positions of the snowflakes
      snowflakes().forEach((snowflake) => {
        snowflake.update(canvasRef(), framesPassed as number);
      });

      // Render them if the canvas is available
      if (ctx()) {
        // for images
        ctx()!.setTransform(1, 0, 0, 1, 0, 0);
        ctx()!.clearRect(0, 0, canvasRef().offsetWidth, canvasRef().offsetHeight);

        snowflakes().forEach((snowflake) => snowflake.draw(ctx()!));
      }
    }
  };

  const loop = () => {
    // Update based on time passed so that a slow frame rate won't slow down the snowflake
    const now = Date.now();
    const msPassed = Date.now() - lastUpdate;
    lastUpdate = now;

    // Frames that would have passed if running at 60 fps
    const framesPassed = msPassed / targetFrameTime;

    render(framesPassed);

    animationFrame = requestAnimationFrame(loop);
  };

  onMount(() => {
    loop();
  });

  onCleanup(() => cancelAnimationFrame(animationFrame));

  return (
    <canvas
      ref={setCanvasRef}
      height={canvasSize.height!}
      width={canvasSize.width!}
      style={mergedStyle()}
      data-testid="SnowfallCanvas"
    />
  );
};

export default Snowfall;
