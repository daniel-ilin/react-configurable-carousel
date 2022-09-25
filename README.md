# react-configurable-carousel
A simple and responsive configurable 2D/3D carousel React component for images

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
import { Carousel } from "@daniel-ilin/react-configurable-carousel";

<Carousel
  arrows={true}
  dotsNavigation={true}
  dotsNavigationInside={true}
  images={urls}
  width={"1200px"}
  height={"400px"}
  carouselStyle={"3d"}
/>
```

### Options
```<Carousel />``` Takes the following props:

| Property  | Type | Description
| ------------- | ------------- | ------------- |
| ```arrows```  | ```boolean```  | Shows/hides navigation arrows |
| ```dotsNavigation```  | ```boolean```  | Shows/hides navigation dots |
| ```images```  | ```[string]```  | Array of displayed images urls |
| ```width```  | ```string```  | CSS Property for carousel width |
| ```height```  | ```string```  | CSS Property for carousel height |
| ```carouselStyle?```  | ```"flat" \| "3d"```  | Carousel style |
| ```dotsNavigationInside?```  | ```boolean```  | Places navigation dots inside of carousel (Defaults to false) |
| ```dotNavigationOutlineColor?```  | ```string```  | Navigation dots border color |
| ```dotNavigationFillColor?``` | ```number``` | Navigation dots active fill color |
| ```autoScrollInterval?```  | ```number```  | Time interval for auto-scro ll. Auto-scroll will be disabled if not specified |
| ```autoScrollClickDelay?```  | ```number```  | Time delay for auto-scroll after user interacts with the carousel |
