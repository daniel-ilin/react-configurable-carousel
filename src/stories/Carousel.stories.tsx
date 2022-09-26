import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import Carousel from "../components/Carousel";

export default {
  title: "Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

let imageUrls = [
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
  "https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300",
];

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args}>
    <div
      style={{
        backgroundColor: "pink",
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
    <div
      style={{
        backgroundColor: "brown",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={imageUrls[0]} width="50%"></img>
    </div>
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
      <video width="320" height="240" controls>
        <source
          type="video/ogg"
          src="http://techslides.com/demos/sample-videos/small.ogv"
        ></source>
      </video>
    </div>
    <div
      style={{
        backgroundColor: "yellow",
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    ></div>
  </Carousel>
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  arrows: true,
  dotsNavigation: true,
  width: "800px",
  height: "500px",
};
