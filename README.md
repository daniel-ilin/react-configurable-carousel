# react-configurable-carousel

A simple and responsive configurable 2D/3D carousel React component to display anything you like

## Examples

### 3D-Style

<img src="https://media3.giphy.com/media/x4l2PXDCIx6MYSsQPK/giphy.gif?cid=790b76115829a48c487fd14a36da3418fa5997ac1bd6541b&rid=giphy.gif&ct=g" width="700" />

### 2D-Style

<img src="https://media0.giphy.com/media/gAF6DM0L4vfXhDKA8h/giphy.gif?cid=790b761175be94dd450583df7eb6bdf7057d3caa5ac00d75&rid=giphy.gif&ct=g" width="700" />

## Get started

### Installation

```console
npm install react-configurable-carousel
```

### Example

```js
import { Carousel } from "react-configurable-carousel";

<Carousel
  arrows={true}
  dotsNavigation={true}
  dotsNavigationInside={true}
  width={"1200px"}
  height={"400px"}
  carouselStyle={"3d"}
>
  <span>
    <h2>Hello, world!</h2>
  </span>
  <span style={{width: "100%", height: "100%"}}>
    <img src={imageSrc}/>
  </span>
</Carousel>;
```

### Options

`<Carousel />` Component displays the Components passed in as children
It takes the following props:

| Property                     | Type             | Description                                                                   |
| ---------------------------- | ---------------- | ----------------------------------------------------------------------------- |
| `arrows`                     | `boolean`        | Shows/hides navigation arrows                                                 |
| `dotsNavigation`             | `boolean`        | Shows/hides navigation dots                                                   |
| `width`                      | `string`         | CSS Property for carousel width                                               |
| `height`                     | `string`         | CSS Property for carousel height                                              |
| `children?`                  | `ReactNode`      | Components that will be displayed in the Carousel                             |
| `carouselStyle?`             | `"flat" \| "3d"` | Carousel style                                                                |
| `dotsNavigationInside?`      | `boolean`        | Places navigation dots inside of carousel (Defaults to false)                 |
| `dotNavigationOutlineColor?` | `string`         | Navigation dots border color                                                  |
| `dotNavigationFillColor?`    | `number`         | Navigation dots active fill color                                             |
| `autoScrollInterval?`        | `number`         | Time interval for auto-scro ll. Auto-scroll will be disabled if not specified |
| `autoScrollClickDelay?`      | `number`         | Time delay for auto-scroll after user interacts with the carousel             |
