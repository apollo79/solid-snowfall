import { render, screen } from "@solidjs/testing-library";

import { vitest } from "vitest";

import { snowfallBaseStyle } from "./config";
import { createSnowFlakes } from "./hooks";
import Snowfall from "./Snowfall";

vitest.mock("./hooks");

test("renders without crashing", () => {
  render(() => <Snowfall />);

  expect(screen.getByTestId("SnowfallCanvas")).toBeInTheDocument();
});

describe("Styles", () => {
  test("applies the default styles if none are provided", () => {
    render(() => <Snowfall />);

    expect(screen.getByTestId("SnowfallCanvas")).toHaveStyle(snowfallBaseStyle as Record<string, unknown>);
  });

  test("overrides the default style properties with any provided styles", () => {
    const providedStyles = { top: "10px", left: "10px", zIndex: -1 };

    render(() => <Snowfall style={providedStyles} />);

    expect(screen.getByTestId("SnowfallCanvas")).toHaveStyle({
      ...snowfallBaseStyle,
      ...providedStyles,
    });
  });
});

test("renders the specified number of snowflakes", () => {
  render(() => <Snowfall snowflakeCount={100} />);

  expect(createSnowFlakes).toHaveBeenCalledWith(expect.any(Object), 100, expect.any(Object));
});
