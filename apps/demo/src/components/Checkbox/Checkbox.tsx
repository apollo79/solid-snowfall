import { createSignal, JSX, Show, splitProps } from "solid-js";

import "./checkbox.scss";
interface Handler {
  (checked: boolean): void;
}

interface CheckboxProps {
  checked?: boolean;
  onChange?: Handler;
  onchange?: Handler;
  onInput?: Handler;
  oninput?: Handler;
}

export function Checkbox(props: CheckboxProps) {
  const [{ checked: defaultChecked = false }, eventHandlers] = splitProps(
    props,
    ["checked"],
    ["onchange", "onChange", "oninput", "onInput"],
  );

  const [checked, setChecked] = createSignal(defaultChecked);

  const triggerEventHandlers = () => {
    Object.values(eventHandlers).forEach((handler) => {
      handler(checked());
    });
  };

  const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (event) => {
    setChecked(event.currentTarget.checked);
    triggerEventHandlers();
  };

  return (
    <span
      class="checkbox-wrap"
      classList={{ checked: checked() }}
    >
      <input
        type="checkbox"
        checked={checked()}
        onInput={handleInput}
      />
      <Show
        when={checked()}
        fallback={
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>
        }
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </Show>
    </span>
  );
}
