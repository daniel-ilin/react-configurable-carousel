import * as React from "react";
import arrowIconPath from "../../icons/ArrowIcon";
import styles from "./Arrow.module.scss";

type ArrowProps = {
  direction: "up" | "down" | "left" | "right";
};

export const Arrow = (props: ArrowProps) => {
  return (
    <>
      <div className={styles[props.direction]} style={{ cursor: "pointer" }}>
        <img src={arrowIconPath} />
      </div>
    </>
  );
};
