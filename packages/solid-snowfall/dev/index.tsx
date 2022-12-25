import { render } from "solid-js/web";

import SnowFall from "../src";

import logo from "./logo.png";

const image = document.createElement("img");
image.src = logo;

render(() => <SnowFall />, document.getElementById("root") as HTMLDivElement);
