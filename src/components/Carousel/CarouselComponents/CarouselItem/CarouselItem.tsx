import * as React from "react";
import styles from "./CarouselItem.module.scss";

type CarouselItemProps = {
  isShowing: boolean;
  children?: React.ReactNode;
  height: string;
  outOfFocusDarken: boolean;
};

export const CarouselItem = (props: CarouselItemProps) => {
  const getStyle = (isShowing: boolean, isDarken: boolean): string => {
    let style = `${styles["overlay"]}`;
    if (!isShowing) style += ` ${styles["outOfFocus"]}`;
    if (!isShowing && isDarken) style += ` ${styles["darkened"]}`;
    return style;
  };

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
        <div className={getStyle(props.isShowing, props.outOfFocusDarken)} />
      </div>
    </>
  );
};
