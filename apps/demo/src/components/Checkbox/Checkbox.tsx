import { createEffect, createSignal, JSX, Show } from "solid-js";

import "./checkbox.scss";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox(props: CheckboxProps) {
  const [checked, setChecked] = createSignal(false);

  createEffect(() => {
    setChecked(props.checked ?? false);
  });

  const triggerOnChange = () => {
    props.onChange?.(checked());
  };

  const handleChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    setChecked(event.currentTarget.checked);
    triggerOnChange();
  };

  return (
    <span
      class="checkbox-wrap"
      classList={{ checked: checked() }}
    >
      <input
        type="checkbox"
        checked={checked()}
        onChange={handleChange}
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
