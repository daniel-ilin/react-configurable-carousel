import React from "react";
import { ArrowIcon } from "../../icons";
import styles from "./Arrow.module.scss";

type ArrowProps = {
  direction: "up" | "down" | "left" | "right";
};

export const Arrow = (props: ArrowProps) => {
  return (
    <>
      <div className={styles[props.direction]} style={{ cursor: "pointer" }}>
        <ArrowIcon />
      </div>
    </>
  );
};
