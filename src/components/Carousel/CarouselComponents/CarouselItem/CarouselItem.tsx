import * as React from "react";
import styles from "./CarouselItem.module.scss";

type CarouselItemProps = {
  isShowing: boolean;
  children?: React.ReactNode;
};

export const CarouselItem = (props: CarouselItemProps) => {
  const style = props.isShowing
    ? `${styles["overlay"]}`
    : `${styles["overlay"]} ${styles["outOfFocus"]}`;
  return (
    <>
      <div className={styles.imageContainer}>
        <div className={styles.firstRowColumn}>
          {React.Children.only(props.children)}
        </div>
        <div className={style} />
      </div>
    </>
  );
};
