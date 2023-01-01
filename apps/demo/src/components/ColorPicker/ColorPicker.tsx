import { createSignal, createUniqueId, For, JSX } from "solid-js";

import "./color-picker.scss";

interface ColorPickerProps {
  colors: string[];
  color?: string;
  onChange?: (color: string) => void;
}

export function ColorPicker(props: ColorPickerProps) {
  const name = `color-picker-${createUniqueId()}`;

  const defaultColor = () => props.color ?? props.colors[0];

  const [selected, setSelected] = createSignal(defaultColor());

  const triggerOnChange = () => {
    props.onChange?.(selected());
  };

  const handleChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    const { currentTarget } = event;

    setSelected(currentTarget.value);

    triggerOnChange();
  };

  return (
    <div class="color-picker-wrap">
      <For each={props.colors}>
        {(color) => {
          return (
            <span
              class="color-picker-item"
              data-color={color}
              classList={{ checked: color == selected() }}
              style={{ color }}
            >
              <input
                type="radio"
                name={name}
                value={color}
                aria-labelledby={color}
                checked={color == selected()}
                onChange={handleChange}
              />
              <span class="color-picker-indicator" />
            </span>
          );
        }}
      </For>
    </div>
  );
}
