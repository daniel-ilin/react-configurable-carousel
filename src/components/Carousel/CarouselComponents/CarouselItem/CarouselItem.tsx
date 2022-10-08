import * as React from "react";
import styles from "./CarouselItem.module.scss";

type CarouselItemProps = {
  isShowing: boolean;
  children?: React.ReactNode;
  height: string;
  outOfFocusDarken: boolean;
};

export const CarouselItem = (props: CarouselItemProps) => {
  let style = props.isShowing
    ? `${styles["overlay"]}`
    : `${styles["overlay"]} ${styles["outOfFocus"]}`;

  style +=
    props.outOfFocusDarken && !props.isShowing && ` ${styles["darkened"]}`;

  return (
    <>
      <div className={styles.imageContainer}>
        <div
          className={styles.firstRowColumn}
          style={{
            height: props.height,
            width: "100%",
            objectFit: "cover",
          }}
        >
          {React.Children.only(props.children)}
        </div>
        <div className={style} />
      </div>
    </>
  );
};
