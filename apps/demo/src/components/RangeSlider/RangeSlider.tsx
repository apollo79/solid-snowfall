import { createEffect, createSignal, JSX, onMount, splitProps } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";

import "./range-slider.scss";

interface Handler {
  (
    event: InputEvent & {
      currentTarget: HTMLInputElement;
      target: DOMElement;
    },
    newValue: [number, number],
  ): void;
}

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value?: [number, number];
  onChange?: Handler;
  onchange?: Handler;
  onInput?: Handler;
  oninput?: Handler;
}

export function RangeSlider(props: RangeSliderProps) {
  const [{ max, min, step = 1 }, eventHandlers] = splitProps(
    props,
    ["max", "min", "step"],
    ["onchange", "onChange", "oninput", "onInput"],
  );
  const value = () => props.value,
    defaultValue1 = () => value()?.[0] ?? min,
    defaultValue2 = () => value()?.[1] ?? max;

  const [value1, setValue1] = createSignal(defaultValue1());
  const [value2, setValue2] = createSignal(defaultValue2());

  const [ref1, setRef1] = createSignal<HTMLInputElement>();
  const [ref2, setRef2] = createSignal<HTMLInputElement>();

  const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (event) => {
    const { currentTarget: target } = event;
    target.parentElement?.style.setProperty(`--multi-input-${target.dataset.multiInput}`, target.value);

    Object.values(eventHandlers).forEach((handler) => {
      handler(event, [value1(), value2()]);
    });
  };

  createEffect(() => {
    ref1()!.value = String(defaultValue1());

    ref2()!.value = String(defaultValue2());
  });

  return (
    <div
      class={`multi-slider-wrap`}
      role="group"
      aria-labelledby="multi-lbl"
      style={{ "--multi-input-1": defaultValue1(), "--multi-input-2": defaultValue2(), "--min": min, "--max": max }}
    >
      <input
        ref={setRef1}
        data-multi-input="1"
        type="range"
        min={min}
        max={max}
        step={step}
        onInput={(event) => {
          setValue1(Number(event.currentTarget.value));
          handleInput(event);
        }}
      />
      <input
        ref={setRef2}
        data-multi-input="2"
        type="range"
        min={min}
        max={max}
        step={step}
        onInput={(event) => {
          setValue2(Number(event.currentTarget.value));
          handleInput(event);
        }}
      />
    </div>
  );
}
