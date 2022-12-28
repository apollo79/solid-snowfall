import { createStore, produce } from "solid-js/store";

import { SnowfallProps } from "solid-snowfall";

export interface SnowfallSettings extends SnowfallProps {
  useImages: boolean;
}

export const [settingsStore, setSettingsStore] = createStore<SnowfallSettings>({
  color: "#dee4fd",
  snowflakeCount: 200,
  radius: [0.5, 3.0],
  speed: [0.5, 3.0],
  wind: [-0.5, 2.0],
  rotationSpeed: [-1.0, 1.0],
  useImages: false,
});

export function setUseImages(useImages: boolean) {
  if (useImages) {
    setSettingsStore(
      produce((s) => {
        s.useImages = useImages;
        s.radius = [5, 20];
      }),
    );
  } else {
    setSettingsStore(
      produce((s) => {
        s.useImages = useImages;
        s.radius = [0.5, 3];
      }),
    );
  }

  console.log(settingsStore.radius);
}
