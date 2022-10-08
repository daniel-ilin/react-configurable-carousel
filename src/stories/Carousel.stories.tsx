// Showcase images taken from Unsplash - https://unsplash.com/
// Showcase video taken from Pixabay - https://pixabay.com

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Carousel from "../components/Carousel";

export default {
  title: "Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

let imageUrls = [
  "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",  
  "https://images.unsplash.com/photo-1542361345-89e58247f2d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
];

let videoUrl =
  "https://player.vimeo.com/video/577442929?title=0&portrait=0&byline=0&autoplay=1&loop=1&transparent=1";

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args}>
    <img
      src={imageUrls[0]}
      width="100%"
      height="100%"
      style={{ objectFit: "cover" }}
    ></img>
    <div
      style={{
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <iframe
        src={videoUrl}
        style={{
          border: "none",
          objectFit: "fill",
        }}
        width="100%"
        height="100%"
      ></iframe>
    </div>
    <div
      style={{
        backgroundColor: "#F9F6EE",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
      }}
    >
      <span>Hello!</span>
    </div>
    <img
      src={imageUrls[1]}
      width="100%"
      height="100%"
      style={{ objectFit: "cover" }}
    ></img>
  </Carousel>
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  arrows: true,
  dotsNavigation: true,
  width: "100%",
  height: "400px",
  carouselStyle: "3d",
  children: null,
};
