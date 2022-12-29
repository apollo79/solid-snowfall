import { DEV } from "solid-js";

import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  base: DEV ? "/" : "/solid-snowfall/",
});
