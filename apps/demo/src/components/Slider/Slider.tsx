import { batch, createEffect, createMemo, createSignal, For, JSX, on, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import { createElementBounds } from "@solid-primitives/bounds";
import { destructure } from "@solid-primitives/destructure";

import { getNearest, round } from "../../utils";

import "./slider.scss";

interface SliderProps<T extends number | number[]> {
  min: number;
  max: number;
  step?: number;
  value?: T;
  onChange?: (newValue: T) => void;
}

export function Slider<T extends number | number[]>(props: SliderProps<T>) {
  const { max, min, step } = destructure(props);

  const diff = createMemo(() => max() - min());

  const defaultValue = createMemo(() => {
    if (!props.value) {
      return [min()];
    }

    if (Array.isArray(props.value)) {
      if (props.value.length == 0) {
        return [min()];
      }

      return props.value;
    }

    return [props.value];
  });

  const [thumbs, setThumbs] = createStore<
    {
      value: number;
      active: boolean;
    }[]
  >([]);

  const values = createMemo(() => thumbs.map((thumb) => thumb.value));

  // if only one thumb, then 0 -> the rail starts at the beginning
  const smallestValue = createMemo(() => (values().length == 1 ? 0 : Math.min(...values())));

  const biggestValue = createMemo(() => Math.max(...values()));

  const currentActiveIndex = createMemo(() => thumbs.findIndex((thumb) => thumb.active));

  createEffect(
    on(defaultValue, (currDefaultValue, prevDefaultValue) => {
      if (currDefaultValue != values()) {
        batch(() => {
          if (prevDefaultValue) {
            if (currDefaultValue.length < prevDefaultValue.length) {
              setThumbs((thumbs) => {
                return thumbs.slice(0, currDefaultValue.length);
              });
            }
          }

          for (let i = 0; i < defaultValue().length; i++) {
            setThumbs(i, {
              value: defaultValue()[i],
            });
          }
        });
      }
    }),
  );

  const [wrapRef, setWrapRef] = createSignal<HTMLSpanElement>();

  const wrapBounds = createElementBounds(wrapRef);

  const [pointerDown, setPointerDown] = createSignal(false),
    [dragging, setDragging] = createSignal(false);

  createEffect(() => {
    props.onChange?.((values().length == 1 ? values()[0] : values()) as T);
  });

  // add min here for negative values. Without this, the value would be positive all the time and not the right one
  const calcValueFromPortion = (portion: number, whole: number) => (portion / whole) * diff() + min();

  const setNewValueFromPageX = (pageX: number) => {
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

    batch(() => {
      setThumbs(active, "value", rounded);
      setThumbs(active, "active", true);
    });
  };

  const handlePointerDown: JSX.EventHandlerUnion<HTMLSpanElement, PointerEvent> = (event) => {
    setNewValueFromPageX(event.pageX);

    setPointerDown(true);
  };

  const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (event) => {
    const { currentTarget } = event;

    setThumbs(Number(currentTarget.dataset.index), "value", Number(currentTarget.value));
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (pointerDown()) {
      setDragging(true);
      setNewValueFromPageX(event.pageX);
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
      role="group"
      aria-label="slider"
      onPointerDown={handlePointerDown}
    >
      <For each={thumbs}>
        {(thumb, index) => (
          <span
            data-index={index()}
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
