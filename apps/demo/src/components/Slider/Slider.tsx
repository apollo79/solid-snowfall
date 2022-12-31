import { createSignal, JSX, onCleanup, onMount, splitProps } from "solid-js";

import { createElementBounds } from "@solid-primitives/bounds";

import "./slider.scss";

interface Handler {
  (newValue: number): void;
}

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value?: number;
  onChange?: Handler;
  onchange?: Handler;
  onInput?: Handler;
  oninput?: Handler;
}

/**
 * rounds a value to a given step
 * @see https://stackoverflow.com/a/34591063/17797907
 * @example
 * `round(2.74, 0.1)` = 2.7
 * `round(2.74, 0.25)` = 2.75
 * `round(2.74, 0.5)` = 2.5
 * `round(2.74, 1.0)` = 3.0
 */
function round(value: number, step?: number) {
  step ||= 1.0;
  const inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}

export function Slider(props: SliderProps) {
  const [{ max, min, step = 1 }, eventHandlers] = splitProps(
    props,
    ["max", "min", "step"],
    ["onchange", "onChange", "oninput", "onInput"],
  );

  const diff = () => max - min;

  const defaultValue = () => props.value ?? min;

  const [wrapRef, setWrapRef] = createSignal<HTMLSpanElement>();

  const wrapBounds = createElementBounds(wrapRef);

  const [value, setValue] = createSignal(defaultValue());

  const calcValueFromPortion = (portion: number, whole: number) => (portion / whole) * diff();

  const [pointerDown, setPointerDown] = createSignal(false),
    [dragging, setDragging] = createSignal(false);

  const setNewValue = (pageX: number) => {
    const offsetX = pageX - (wrapBounds.left || 0);

    const val = calcValueFromPortion(offsetX, wrapBounds.width ?? 0),
      rounded = round(val, step);

    setValue(rounded);

    Object.values(eventHandlers).forEach((handler) => {
      handler(value());
    });
  };

  const handleClick: JSX.EventHandlerUnion<HTMLSpanElement, PointerEvent> = (event) => {
    setPointerDown(true);
    setNewValue(event.pageX);
  };

  const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (event) => {
    const { currentTarget } = event;
    setValue(Number(currentTarget.value));

    Object.values(eventHandlers).forEach((handler) => {
      handler(value());
    });
  };

  const handleThumbMove: JSX.EventHandlerUnion<HTMLSpanElement, PointerEvent> = (event) => {
    if (pointerDown()) {
      setNewValue(event.pageX);
      setDragging(true);
    }
  };

  const handlePointerUp = () => {
    setPointerDown(false);
    setDragging(false);
  };

  onMount(() => {
    window.addEventListener("pointerup", handlePointerUp);
  });

  onCleanup(() => {
    window.removeEventListener("pointerup", handlePointerUp);
  });

  return (
    <span
      ref={setWrapRef}
      class="slider-wrap"
      classList={{ dragging: dragging() }}
      style={{ "--value": value(), "--min": min, "--max": max }}
      onPointerDown={handleClick}
      onPointerMove={handleThumbMove}
    >
      <span class="slider-rail" />
      <span class="slider-track" />
      <span
        data-index="0"
        data-focusvisible="false"
        class="slider-thumb"
        classList={{ active: pointerDown() }}
      >
        <input
          data-index="0"
          aria-label="Default"
          aria-valuenow={value()}
          aria-orientation="horizontal"
          aria-valuemax={max}
          aria-valuemin={min}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value()}
          onInput={handleInput}
        />
      </span>
    </span>
  );
}
