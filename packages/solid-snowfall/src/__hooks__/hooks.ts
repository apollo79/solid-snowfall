import { vitest } from "vitest";

const hooks: typeof import("../hooks") = await vitest.importActual("../hooks");

export const createComponentSize = vitest.fn(hooks.createComponentSize);
export const useDeepMemo = vitest.fn(hooks.createDeepCompareMemo);
export const useSnowfallStyle = vitest.fn(hooks.createSnowFallStyle);
export const useSnowflakes = vitest.fn(hooks.createSnowFlakes);
