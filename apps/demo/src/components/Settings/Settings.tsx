import { Show } from "solid-js";

import { setSettingsStore, settingsStore, setUseImages } from "../../settings";
import { RangeSlider } from "../RangeSlider/RangeSlider";
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
          Speed <ValueChip label={`Min ${settingsStore?.speed?.[0]}`} />
          <ValueChip label={`Max ${settingsStore?.speed?.[1]}`} />
        </label>
        <RangeSlider
          value={settingsStore.speed}
          min={0}
          max={10}
          step={0.5}
          onChange={(_, value) => setSettingsStore("speed", value)}
        />
      </div>
      <div>
        <label>
          Wind <ValueChip label={`Min ${settingsStore?.wind?.[0]}`} />{" "}
          <ValueChip label={`Max ${settingsStore?.wind?.[1]}`} />
        </label>
        <RangeSlider
          value={settingsStore.wind}
          min={-1}
          max={10}
          step={0.5}
          onChange={(_, value) => setSettingsStore("wind", value)}
        />
      </div>
      <div>
        <label>
          Radius <ValueChip label={`Min ${settingsStore?.radius?.[0]}`} />
          <ValueChip label={`Max ${settingsStore?.radius?.[1]}`} />
        </label>
        <RangeSlider
          value={settingsStore.radius}
          min={0.5}
          max={30}
          step={0.5}
          onChange={(_, value) => setSettingsStore("radius", value)}
        />
      </div>
      <div>
        <input
          id="use-images"
          type="checkbox"
          checked={settingsStore.useImages}
          onChange={(event) => setUseImages(event.currentTarget.checked)}
        />
        <label for="use-images">Use Images</label>
      </div>
      <Show when={settingsStore.useImages}>
        <div>
          <label>
            Rotation Speed <ValueChip label={`Min ${settingsStore?.rotationSpeed?.[0]}`} />
            <ValueChip label={`Max ${settingsStore?.rotationSpeed?.[1]}`} />
          </label>
          <RangeSlider
            value={settingsStore.rotationSpeed}
            min={-5}
            max={10}
            step={0.5}
            onChange={(_, value) => setSettingsStore("rotationSpeed", value)}
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
