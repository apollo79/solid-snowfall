import { createSignal, JSX, onMount, splitProps } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";

import "./slider.scss";

interface Handler {
  (
    event: InputEvent & {
      currentTarget: HTMLInputElement;
      target: DOMElement;
    },
    newValue: number,
  ): void;
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

export function Slider(props: SliderProps) {
  const [{ max, min, step = 1 }, eventHandlers] = splitProps(
    props,
    ["max", "min", "step"],
    ["onchange", "onChange", "oninput", "onInput"],
  );
  const defaultValue = () => props.value ?? min;

  const [ref, setRef] = createSignal<HTMLInputElement>();

  const [value, setValue] = createSignal(defaultValue());

  const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (event) => {
    const { currentTarget: target } = event;
    target.parentElement?.style.setProperty("--slider-input", target.value);

    Object.values(eventHandlers).forEach((handler) => {
      handler(event, value());
    });
  };

  onMount(() => {
    ref()!.value = String(defaultValue());
  });

  return (
    <div
      class="slider-wrap"
      style={{ "--slider-input": defaultValue(), "--min": min, "--max": max }}
    >
      <input
        ref={setRef}
        type="range"
        min={min}
        // value={defaultValue}
        max={max}
        step={step}
        onInput={(event) => {
          setValue(Number(event.currentTarget.value));
          handleInput(event);
        }}
      />
    </div>
  );
}
