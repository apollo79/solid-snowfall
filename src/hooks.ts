import { Accessor, createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import { EffectFunction } from "solid-js/types/reactive/signal";

import isEqual from "fast-deep-equal";

import { snowfallBaseStyle } from "./config";
import Snowflake, { SnowflakeConfig } from "./Snowflake";
import { getSize } from "./utils";

/**
 * A utility function to create a collection of snowflakes
 * @param canvasRef A ref to the canvas element
 * @param amount The number of snowflakes
 * @param config The configuration for each snowflake
 */
const createSnowflakesArray = (canvasRef: HTMLCanvasElement, amount: number, config: SnowflakeConfig): Snowflake[] => {
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
  config: Accessor<SnowflakeConfig>,
) => {
  const [snowflakes, setSnowflakes] = createSignal<Snowflake[]>([]);

  // Handle change of amount
  createEffect(() => {
    setSnowflakes((snowflakes) => {
      const sizeDifference = amount() - snowflakes.length;

      if (sizeDifference > 0) {
        return [...snowflakes, ...createSnowflakesArray(canvasRef(), sizeDifference, config())];
      }

      if (sizeDifference < 0) {
        return snowflakes.slice(0, amount());
      }

      return snowflakes;
    });
  });

  // Handle change of config
  createEffect(() => {
    setSnowflakes((snowflakes) =>
      snowflakes.map((snowflake) => {
        snowflake.updateConfig(config());
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
export const useComponentSize = (ref: Accessor<HTMLElement>) => {
  const [size, setSize] = createSignal(getSize(ref()));

  const resizeHandler = createMemo(() => {
    if (ref()) {
      setSize(getSize(ref()));
    }
  });

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

/**
 * Returns the height and width of a HTML element, uses the `ResizeObserver` api if available to detect changes to the
 * size. Falls back to listening for resize events on the window.
 * @param ref A ref to the HTML element to be measured
 */
export const createSnowFallStyle = (
  overrides?: Accessor<Record<string, string | number> | undefined>,
): Accessor<Record<string, string | number>> => {
  const styles = createMemo(() => ({
    ...snowfallBaseStyle,
    ...(overrides || {}),
  }));

  return styles;
};

/**
 * Utility hook to stabilize a reference to a value, the returned value will always match the input value
 * but (unlike an inline object) will maintain [SameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * equality until a change is made.
 *
 * @example
 *
 * const obj = useDeepMemo({ foo: 'bar', bar: 'baz' }) // <- inline object creation
 * const prevValue = usePrevious(obj) // <- value from the previous render
 * console.log(obj === prevValue) // <- always logs true until value changes
 */
export function createDeepCompareMemo<T>(effect: EffectFunction<T | undefined>): Accessor<T> {
  const result = createMemo(effect, undefined, {
    equals: (a, b) => isEqual(a, b),
  });

  return result as Accessor<T>;
}
