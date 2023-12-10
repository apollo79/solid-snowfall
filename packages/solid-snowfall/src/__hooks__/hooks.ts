import { vitest } from "vitest";

const hooks: typeof import("../hooks") = await vitest.importActual("../hooks");

export const createComponentSize = vitest.fn(hooks.createComponentSize);
export const useSnowflakes = vitest.fn(hooks.createSnowFlakes);
