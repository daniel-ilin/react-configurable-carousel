import { ListItem } from "../Carousel";
import styles from "./DotsNavigation.module.scss";
import React from "react";

type DotsNavigationProps = {
  items: ListItem[] | undefined;
  selectedIndex: number;
  jumpToIndex: (index: number) => void;
  dotNavigationOutlineColor?: string;
  dotNavigationFillColor?: string;
};

export const DotsNavigation = (props: DotsNavigationProps) => {
  return (
    <>
      <div className={styles.dotsContainer}>
        {props.items &&
          props.items.map((item, index) => {
            let fillColor = props.dotNavigationFillColor
              ? `${props.dotNavigationFillColor}`
              : `gray`;

            let outlineColor = props.dotNavigationOutlineColor
              ? `${props.dotNavigationOutlineColor}`
              : `gray`;

            let style = !item.isSelected
              ? { border: `1px solid ${outlineColor}` }
              : {
                  border: `1px solid ${outlineColor}`,
                  background: `${fillColor}`,
                };

            return (
              <span
                className={styles["dot"]}
                style={style}
                key={index}
                onClick={() => props.jumpToIndex(index)}
              />
            );
          })}
      </div>
    </>
  );
};
