import styles from "./DotsNavigation.module.scss";
import * as React from "react";

type DotsNavigationProps = {
  items: React.ReactNode;
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
          React.Children.map(props.items, (item, index) => {
            let fillColor = props.dotNavigationFillColor
              ? `${props.dotNavigationFillColor}`
              : `gray`;

            let outlineColor = props.dotNavigationOutlineColor
              ? `${props.dotNavigationOutlineColor}`
              : `gray`;

            let style = !(index === props.selectedIndex)
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
