import { Show } from "solid-js";

import { setSettingsStore, settingsStore, setUseImages } from "../../settings";
import { Checkbox } from "../Checkbox/Checkbox";
import { Slider } from "../Slider/Slider";
import { ValueChip } from "../ValueChip/ValueChip";

import "./settings.scss";

const colors = [
  "#dee4fd",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];

const Settings = () => {
  return (
    <div class="settings-container">
      <div>
        <label>
          Snowflake Count <ValueChip label={settingsStore.snowflakeCount ?? ""} />
        </label>
        <Slider
          value={settingsStore.snowflakeCount}
          min={0}
          max={750}
          step={1}
          onChange={(value) => setSettingsStore("snowflakeCount", value)}
        />
      </div>
      <div>
        <label>
          Speed <ValueChip label={`Min ${Math.min(...(settingsStore?.speed || []))}`} />
          <ValueChip label={`Max ${Math.max(...(settingsStore?.speed || []))}`} />
        </label>
        <Slider
          value={settingsStore.speed}
          min={0}
          max={10}
          step={0.5}
          onChange={(value) => setSettingsStore("speed", value)}
        />
      </div>
      <div>
        <label>
          Wind <ValueChip label={`Min ${Math.min(...(settingsStore?.wind || []))}`} />{" "}
          <ValueChip label={`Max ${Math.max(...(settingsStore?.wind || []))}`} />
        </label>
        <Slider
          value={settingsStore.wind}
          min={-1}
          max={10}
          step={0.5}
          onChange={(value) => setSettingsStore("wind", value)}
        />
      </div>
      <div>
        <label>
          Radius <ValueChip label={`Min ${Math.min(...(settingsStore?.radius || []))}`} />
          <ValueChip label={`Max ${Math.max(...(settingsStore?.radius || []))}`} />
        </label>
        <Slider
          value={settingsStore.radius}
          min={0.5}
          max={30}
          step={0.5}
          onChange={(value) => setSettingsStore("radius", value)}
        />
      </div>
      <div>
        <label>
          <Checkbox onChange={(checked) => setUseImages(checked)} />
          Use Images
        </label>
      </div>
      <Show when={settingsStore.useImages}>
        <div>
          <label>
            Rotation Speed <ValueChip label={`Min ${Math.min(...(settingsStore?.rotationSpeed || []))}`} />
            <ValueChip label={`Max ${Math.max(...(settingsStore?.rotationSpeed || []))}`} />
          </label>
          <Slider
            value={settingsStore.rotationSpeed}
            min={-5}
            max={10}
            step={0.5}
            onChange={(value) => setSettingsStore("rotationSpeed", value)}
          />
        </div>
      </Show>
      {/* <Show when={!settingsStore.useImages}>
        <Box my={2}>
          <h2>
            Color <ValueChip label={settingsStore.color ?? ""} />
          </h2>
          <CirclePicker
            colors={colors}
            width="100%"
            color={settingsStore.color}
            onChangeComplete={(value) => setSettingsStore("color", value.hex)}
          />
        </Box>
      </Show> */}
    </div>
  );
};

export default Settings;
