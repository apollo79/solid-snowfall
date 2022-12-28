import "./value-chip.scss";

interface ValueChipProps {
  label: string | number;
}

export function ValueChip(props: ValueChipProps) {
  return (
    <span class="value-chip">
      <span>{props.label}</span>
    </span>
  );
}
