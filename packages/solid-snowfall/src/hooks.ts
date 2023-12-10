import { Accessor, createEffect, createSignal, on, onCleanup } from "solid-js";
import { Store } from "solid-js/store";

import { trackStore } from "@solid-primitives/deep";

import { Snowflake, SnowflakeConfig } from "./Snowflake";
import { getSize } from "./utils";

/**
 * A utility function to create a collection of snowflakes
 * @param canvasRef A ref to the canvas element
 * @param amount The number of snowflakes
 * @param config The configuration for each snowflake
 */
const makeSnowflakesArray = (canvasRef: HTMLCanvasElement, amount: number, config: SnowflakeConfig): Snowflake[] => {
  if (!canvasRef) return [];

  const snowflakes: Snowflake[] = [];

  for (let i = 0; i < amount; i++) {
    snowflakes.push(new Snowflake(canvasRef, config));
  }

  return snowflakes;
};

/**
 * A utility hook to manage creating and updating a collection of snowflakes
 * @param canvasRef A ref to the canvas element
 * @param amount The number of snowflakes
 * @param config The configuration for each snowflake
 */
export const createSnowFlakes = (
  canvasRef: Accessor<HTMLCanvasElement>,
  amount: Accessor<number>,
  config: Store<SnowflakeConfig>,
) => {
  const [snowflakes, setSnowflakes] = createSignal<Snowflake[]>([]);

  // Handle change of amount
  createEffect(
    on(amount, () => {
      setSnowflakes((snowflakes) => {
        const sizeDifference = amount() - snowflakes.length;

        if (sizeDifference > 0) {
          return [...snowflakes, ...makeSnowflakesArray(canvasRef(), sizeDifference, config)];
        }

        if (sizeDifference < 0) {
          return snowflakes.slice(0, amount());
        }

        return snowflakes;
      });
    }),
  );

  // Handle change of config
  createEffect(() => {
    trackStore(config);
    setSnowflakes((snowflakes) =>
      snowflakes.map((snowflake) => {
        snowflake.updateConfig(config);
        return snowflake;
      }),
    );
  });

  return snowflakes;
};

/**
 * Returns the height and width of a HTML element, uses the `ResizeObserver` api if available to detect changes to the
 * size. Falls back to listening for resize events on the window.
 * @param ref A ref to the HTML element to be measured
 */
export const createComponentSize = (ref: Accessor<HTMLElement>) => {
  const [size, setSize] = createSignal(getSize(ref()));

  const resizeHandler = () => {
    if (ref()) {
      setSize(getSize(ref()));
    }
  };

  createEffect(() => {
    const { ResizeObserver } = window;

    if (!ref()) return;
    resizeHandler();

    if (typeof ResizeObserver === "function") {
      const resizeObserver = new ResizeObserver(resizeHandler);
      resizeObserver.observe(ref());

      onCleanup(() => resizeObserver.disconnect());
    } else {
      window.addEventListener("resize", resizeHandler);

      onCleanup(() => window.removeEventListener("resize", resizeHandler));
    }
  });

  return size;
};
