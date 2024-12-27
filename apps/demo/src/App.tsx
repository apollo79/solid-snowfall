import { destructure } from "@solid-primitives/destructure";
import Snowfall from "solid-snowfall";

import { GithubLink } from "./components/GithubLink/GithubLink";
import Settings from "./components/Settings";
import logo from "./logo.png";
import { settingsStore } from "./settings";

import "./app.scss";

const githubURL = "https://github.com/apollo79/solid-snowfall";
const packageName = "solid-snowfall";

const snowflake = document.createElement("img");
snowflake.src = logo;

const images = [snowflake];

export function App() {
  const { color, snowflakeCount, radius, speed, wind, useImages, rotationSpeed } = destructure(settingsStore);


  return (
    <div class="app">
      <Snowfall
        color={color?.()}
        snowflakeCount={snowflakeCount?.()}
        radius={radius?.()}
        speed={speed?.()}
        wind={wind?.()}
        images={useImages() ? images : undefined}
        rotationSpeed={rotationSpeed?.()}
      />
      <a
        class="title"
        href={githubURL}
        style={{ color: color?.() }}
      >
        <img
          src={logo}
          alt="Snowflake Logo"
        />
        <h1>{packageName}</h1>
      </a>
      <Settings />
      <GithubLink url={githubURL} />
    </div>
  );
}

export default App;
