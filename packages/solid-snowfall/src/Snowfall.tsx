import { Component, createMemo, createSignal, JSX, mergeProps, onCleanup, onMount, splitProps } from "solid-js";

import { createElementSize } from "@solid-primitives/resize-observer";

import { snowfallBaseStyle, targetFrameTime } from "./config";
import { createSnowFlakes } from "./hooks";
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

export const Snowfall: Component<SnowfallProps> = (props) => {
  const [configProps, other] = splitProps(
    props,
    ["color", "changeFrequency", "radius", "speed", "wind", "rotationSpeed", "images"],
    ["snowflakeCount", "style"],
  );

  const config = mergeProps(configProps, defaultConfig);

  const mergedStyle = () => ({
    ...snowfallBaseStyle,
    ...(other.style || {}),
  });

  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement>(null as unknown as HTMLCanvasElement);
  const ctx = createMemo(() => canvasRef()?.getContext("2d"));

  const canvasSize = createElementSize(canvasRef);

  let animationFrame = 0;

  let lastUpdate = Date.now();

  const snowflakes = createSnowFlakes(canvasRef, () => other.snowflakeCount!, config);

  // no need for reactivity here
  const render = (framesPassed = 1) => {
    // Update the positions of the snowflakes
    snowflakes().forEach((snowflake) => {
      snowflake.update(canvasRef(), framesPassed as number);
    });

    const context = ctx() as CanvasRenderingContext2D;

    // Render them if the canvas is available
    // for images
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvasRef().offsetWidth, canvasRef().offsetHeight);

    snowflakes().forEach((snowflake) => snowflake.draw(context));
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
