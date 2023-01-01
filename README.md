![Snowfall Demo](./assets/snowfall-demo-banner.gif)

# Solid Snowfall

[![npm](https://img.shields.io/npm/v/solid-snowfall.svg)](https://www.npmjs.com/package/solid-snowfall)
[![GitHub stars](https://img.shields.io/github/stars/apollo79/solid-snowfall.svg)](https://github.com/apollo79/solid-snowfall/stargazers)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

A solid component that creates a snowfall effect

- [Live Example](https://apollo79.github.io/solid-snowfall)
- [Demo Playground](https://codesandbox.io/s/github/apollo79/solid-snowfall/tree/main/apps/demo)

## Installation

With npm

```
npm i solid-snowfall
```

With yarn

```
yarn add solid-snowfall
```

Or wit pnpm

```
pnpm add solid-snowfall
```

## Usage

Basic usage requires no properties - it will grow to fill the nearest relative positioned parent element.

```tsx
import { render } from "solidjs/web";
import SnowFall from "solid-snowfall";

render(
  () => (
    <>
      <SnowFall />
  ),
  document.getElementById("root") as HTMLDivElement,
);
```

## Configuration

Optional properties can be provided to customise the animation.

```tsx
<Snowfall
  // The color of the snowflake, can be any valid CSS color.
  color="#fff"
  // Applied to the canvas element.
  style={{ background: '#fff' }}
  // Controls the number of snowflakes that are created (defaults to 150).
  snowflakeCount={200}
/>
```

All available properties are detailed below.

| Property          | Description                                                                                                                                                                                                                                                                              | Default       |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `changeFrequency` | The frequency in frames that the wind and speed values will update.                                                                                                                                                                                                                      | `200`         |
| `color`           | The color of the snowflake, can be any valid CSS color.                                                                                                                                                                                                                                  | `'#dee4fd'`   |
| `images`          | An array of images that will be rendered as the snowflakes instead of the default circle shapes.                                                                                                                                                                                         | `undefined`   |
| `radius`          | The minimum and maximum radius of the snowflake in pixels.<br/><br/>The value for each snowflake will be randomly selected within this range.                                                                                                                                            | `[0.5, 3.0]`  |
| `rotationSpeed`   | The minimum and maximum rotation speed of the snowflake (in degrees of rotation per frame).<br/><br/>The rotation speed determines how quickly the snowflake rotates when an image is being rendered.<br/><br/>The value for each snowflake will be randomly selected within this range. | `[-1.0, 1.0]` |
| `snowflakeCount`  | The number of snowflakes to be rendered.                                                                                                                                                                                                                                                 | `150`         |
| `speed`           | The minimum and maximum speed of the snowflake (in pixels per frame).<br/><br/>The speed determines how quickly the snowflake moves along the y axis (vertical speed).<br/><br/>The value for each snowflake will be randomly selected within this range.                                | `[1.0, 3.0]`  |
| `style`           | Any style properties that will be passed to the canvas element.                                                                                                                                                                                                                          | `undefined`   |
| `wind`            | The minimum and maximum wind of the snowflake (in pixels per frame).<br/><br/>The wind determines how quickly the snowflake moves along the x axis (horizontal speed).<br/><br/>The value for each snowflake will be randomly selected within this range.                                | `[-0.5, 2.0]` |
## Using Images

Instead of rendering colored circles you can instead pass in an array of image elements
that will be randomly selected and used as the snowflake instead.

> _NOTE_: If the images provided are not square they will be stretched into a 1:1 aspect ratio.
```tsx
const snowflake1 = document.createElement('img')
snowflake1.src = '/assets/snowflake-1.png'
const snowflake2 = document.createElement('img')
snowflake2.src = '/assets/snowflake-2.jpg'
const images = [snowflake1, snowflake2]
const Demo = () => {
  return (
    <Snowfall
      // Applied to the canvas element
      style={{ background: '#fff' }}
      // Controls the number of snowflakes that are created (default 150)
      snowflakeCount={200}
      // Pass in the images to be used
      images={images}
    >
  )
}
```

## Positioning

The snowfall container is absolute positioned and has the following default styles (see [the definition](https://github.com/apollo79/solid-snowfall/blob/main/packages/solid-snowfall/src/config.ts#L4-L10)):

```css
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
```
If you want the component to cover the entire screen then you can change the position to `fixed` by passing in an overriding styles object:
```tsx
<Snowfall
  style={{
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }}
/>
```