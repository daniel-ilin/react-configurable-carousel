import * as React from "react";
import styles from "./CarouselItem.module.scss";

type CarouselItemProps = {
  isShowing: boolean;
  content: string;
  height: string;
};

export const CarouselItem = (props: CarouselItemProps) => {
  const style = props.isShowing
    ? `${styles["overlay"]}`
    : `${styles["overlay"]} ${styles["outOfFocus"]}`;
  return (
    <>
      <div className={styles.imageContainer}>
        <img
          className={styles.firstRowColumn}
          src={props.content}
          alt={"showcase project"}
          style={{
            height: props.height,
            width: "100%",
            objectFit: "cover",
          }}
        />
        <div className={style} />
      </div>
    </>
  );
};
