import { batch, createEffect, createMemo, createSignal, For, JSX, onCleanup, onMount, splitProps } from "solid-js";
import { createStore } from "solid-js/store";

import { createElementBounds } from "@solid-primitives/bounds";
import { destructure } from "@solid-primitives/destructure";

import { getNearest, round } from "../../utils";

import "./slider.scss";

interface Handler<T extends number | number[]> {
  (newValue: T): void;
}

interface SliderProps<T extends number | number[]> {
  min: number;
  max: number;
  step?: number;
  value?: T;
  onChange?: Handler<T>;
  onchange?: Handler<T>;
  onInput?: Handler<T>;
  oninput?: Handler<T>;
}

export function Slider<T extends number | number[]>(props: SliderProps<T>) {
  const [eventHandlers] = splitProps(props, ["onchange", "onChange", "oninput", "onInput"]);

  const { max, min, step } = destructure(props);

  const diff = () => max() - min();

  const defaultValue = () => {
    if (!props.value) {
      return [min];
    }

    if (Array.isArray(props.value)) {
      if (props.value.length == 0) {
        return [min];
      }

      return props.value;
    }

    return [props.value];
  };

  const [thumbs, setThumbs] = createStore<
    {
      value: number;
      active: boolean;
    }[]
  >([]);

  const values = () => thumbs.map((thumb) => thumb.value);

  const smallestValue = () => (values().length == 1 ? 0 : Math.min(...values()));

  const biggestValue = () => Math.max(...values());

  const currentActiveIndex = createMemo(() => thumbs.findIndex((thumb) => thumb.active));

  createEffect(() => {
    for (let i = 0; i < defaultValue().length; i++) {
      setThumbs(i, {
        value: defaultValue()[i],
      });
    }
  });

  const [wrapRef, setWrapRef] = createSignal<HTMLSpanElement>();

  const wrapBounds = createElementBounds(wrapRef);

  const [pointerDown, setPointerDown] = createSignal(false),
    [dragging, setDragging] = createSignal(false);

  const triggerEventHandlers = () => {
    Object.values(eventHandlers).forEach((handler) => {
      handler((values().length == 1 ? values()[0] : values()) as T);
    });
  };

  // add min here for negative values. Without this, the value would be positive all the time and not the right one
  const calcValueFromPortion = (portion: number, whole: number) => (portion / whole) * diff() + min();

  const setNewValue = (pageX: number) => {
    const offsetX = pageX - (wrapBounds.left || 0),
      calculated = calcValueFromPortion(offsetX, wrapBounds.width ?? 0);

    let val: number = calculated;

    if (calculated < min()) {
      val = min();
    }

    if (calculated > max()) {
      val = max();
    }

    const rounded = round(val, step?.());

    // check if a thumb is dragged and therefore active
    let active = currentActiveIndex();

    // if not (probably a click), get the nearest thumb and use it as active one
    if (active == -1) {
      const nearest = getNearest(val, values());
      active = thumbs.findIndex((thumb) => thumb.value == nearest);
    }

    setThumbs(active, "value", rounded);

    triggerEventHandlers();

    return active;
  };

  const handlePointerDown: JSX.EventHandlerUnion<HTMLSpanElement, PointerEvent> = (event) => {
    batch(() => {
      const nearestIndex = setNewValue(event.pageX);
      setThumbs(nearestIndex, "active", true);
    });

    setPointerDown(true);
  };

  const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (event) => {
    const { currentTarget } = event;

    setThumbs(Number(currentTarget.dataset.index), "value", Number(currentTarget.value));

    triggerEventHandlers();
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (pointerDown()) {
      setDragging(true);
      setNewValue(event.pageX);
    }
  };

  const handlePointerUp = () => {
    setThumbs({}, "active", false);
    setPointerDown(false);
    setDragging(false);
  };

  onMount(() => {
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
  });

  onCleanup(() => {
    window.removeEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
  });

  return (
    <span
      ref={setWrapRef}
      class="slider-wrap"
      classList={{ dragging: dragging() }}
      // substract min so it is a positive value, relative to the range
      style={{ "--min": min(), "--max": max(), "--smallest": smallestValue(), "--biggest": biggestValue() }}
      onPointerDown={handlePointerDown}
    >
      <span class="slider-rail" />
      <span class="slider-track" />
      <For each={thumbs}>
        {(thumb, index) => (
          <span
            data-index={index()}
            data-focusvisible="false"
            class="slider-thumb"
            classList={{ active: thumb.active }}
            // substract min so it is a positive value, relative to the range
            style={{ "--value": thumb.value }}
          >
            <input
              data-index={index()}
              aria-label="Default"
              aria-valuenow={thumb.value}
              aria-orientation="horizontal"
              aria-valuemax={max()}
              aria-valuemin={min()}
              type="range"
              min={min()}
              max={max()}
              step={step?.()}
              value={thumb.value}
              onInput={handleInput}
            />
          </span>
        )}
      </For>
    </span>
  );
}
