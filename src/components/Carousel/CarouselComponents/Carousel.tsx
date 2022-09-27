import * as React from "react";
const { useCallback, useEffect, useState } = React;
import { Arrow } from "../Arrow/Arrow";
import styles from "./Carousel.module.scss";
import { CarouselItem } from "./CarouselItem/CarouselItem";
import { DotsNavigation } from "./DotsNavigation/DotsNavigation";
import { useSwipeable } from "react-swipeable";

const animationTime = 500; //ms

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export interface ListItem {
  isSelected: boolean;
}

type CarouselProps = {
  arrows: boolean;
  dotsNavigation: boolean;
  dotsNavigationInside?: boolean;
  dotNavigationOutlineColor?: string;
  dotNavigationFillColor?: string;
  children?: React.ReactNode;
  width: string;
  height: string;
  autoScrollInterval?: number;
  autoScrollClickDelay?: number;
  carouselStyle?: "flat" | "3d";
};

const Carousel = (props: CarouselProps) => {
  const childrenNum = React.Children.count(props.children);

  let [prevItemStyle, setPrevItemStyle] = useState(` ${styles["prev"]}`);
  let [nextItemStyle, setNextItemStyle] = useState(` ${styles["next"]}`);

  const renderElement = (element: any, index: number) => {
    let style = `${styles["itemContainer"]}`;
    style += is3D ? ` ${styles["threed"]}` : ` ${styles["flat"]}`;
    if (!showItems) return;
    if (showItems[index].isSelected) {
      style += ` ${styles["showing"]}`;
    } else if (index === prevIndex) {
      style += prevItemStyle;
      return (
        <span className={style} key={index} onClick={() => clickHandler("L")}>
          <CarouselItem
            isShowing={showItems[index].isSelected}
            height={props.height}
          >
            {element}
          </CarouselItem>
        </span>
      );
    } else if (index === nextIndex) {
      style += nextItemStyle;
      return (
        <span className={style} key={index} onClick={() => clickHandler("R")}>
          <CarouselItem
            isShowing={showItems[index].isSelected}
            height={props.height}
          >
            {element}
          </CarouselItem>
        </span>
      );
    }
    return (
      <span className={style} key={index}>
        <CarouselItem
          isShowing={showItems[index].isSelected}
          height={props.height}
        >
          {element}
        </CarouselItem>
      </span>
    );
  };

  const [showingIndex, setShowingIndex] = useState(0);
  const [showItems, setShowItems] = useState<ListItem[]>();
  const [waiting, setWaiting] = useState(false);
  const [autoScrollClickDelay, setAutoScrollClickDelay] = useState(false);
  const handlers = useSwipeable({
    onSwipedRight: () => {
      clickHandler("L");
    },
    onSwipedLeft: () => {
      clickHandler("R");
    },
    preventScrollOnSwipe: true,
  });

  const is3D = props.carouselStyle === "3d";

  const shiftLeft = useCallback(() => {
    setPrevItemStyle(` ${styles["prev"]} ${styles["leftClick"]}`);
    setNextItemStyle(` ${styles["next"]} ${styles["leftClick"]}`);
    setShowingIndex((prev) => {
      if (prev === 0) return childrenNum - 1;
      return prev - 1;
    });
  }, [childrenNum]);

  const shiftRight = useCallback(() => {
    setPrevItemStyle(` ${styles["prev"]}`);
    setNextItemStyle(` ${styles["next"]}`);
    setShowingIndex((prev) => {
      if (prev === childrenNum - 1) return 0;
      return prev + 1;
    });
  }, [childrenNum]);

  const rotateCarouselHandler = useCallback(
    (arg0: "L" | "R") => {
      if (waiting === false) {
        setWaiting(true);
        switch (arg0) {
          case "L":
            shiftLeft();
            break;
          case "R":
            shiftRight();
            break;
        }
      }
    },
    [shiftLeft, shiftRight, waiting]
  );

  useEffect(() => {
    let showItems = React.Children.map(props.children, (child, index) => {
      return { isSelected: index === showingIndex };
    });

    if (showItems) setShowItems(showItems);
  }, [props.children, showingIndex]);

  useEffect(() => {
    if (
      autoScrollClickDelay === false &&
      props.autoScrollInterval &&
      props.autoScrollInterval > animationTime
    ) {
      let interval = setInterval(() => {
        rotateCarouselHandler("R");
      }, props.autoScrollInterval);

      return () => clearInterval(interval);
    }
  }, [autoScrollClickDelay, props.autoScrollInterval, rotateCarouselHandler]);

  useEffect(() => {
    const stopWaiting = async () => {
      if (props.autoScrollClickDelay !== undefined) {
        await delay(props.autoScrollClickDelay);
        setAutoScrollClickDelay((prev) => {
          return false;
        });
      }
    };
    if (autoScrollClickDelay === true) stopWaiting();
  }, [autoScrollClickDelay, props.autoScrollClickDelay]);

  useEffect(() => {
    const stopWaiting = async () => {
      await delay(animationTime);
      setWaiting((prev) => {
        return false;
      });
    };
    if (waiting === true) stopWaiting();
  }, [waiting]);

  let prevIndex = showingIndex === 0 ? childrenNum - 1 : showingIndex - 1;
  let nextIndex = showingIndex === childrenNum - 1 ? 0 : showingIndex + 1;

  const jumpToIndexHandler = (index: number) => {
    if (waiting === false) {
      setWaiting(true);
      setShowingIndex(index);
      setAutoScrollClickDelay(true);
    }
  };

  const clickHandler = (dir: "L" | "R") => {
    rotateCarouselHandler(dir);
    setAutoScrollClickDelay(true);
  };

  return (
    <>
      <div
        style={{
          width: props.width,
          height: props.height,
          position: "relative",
        }}
      >
        <div className={styles.verticalContainer}>
          <div className={styles.horizontalContainer}>
            {props.arrows && (
              <button
                onClick={() => {
                  clickHandler("L");
                }}
                className={
                  is3D
                    ? `${styles["arrowButtonContainer"]} ${styles["threed"]} ${styles["left"]}`
                    : `${styles["arrowButtonContainer"]} ${styles["flat"]}  ${styles["left"]}`
                }
              >
                <Arrow direction={"left"} />
              </button>
            )}
            <div className={styles.swipeContainer} {...handlers}>
              {React.Children.map(props.children, (child, index) => {
                return renderElement(child, index);
              })}
            </div>
            {props.arrows && (
              <button
                className={
                  is3D
                    ? `${styles["arrowButtonContainer"]} ${styles["threed"]} ${styles["right"]}`
                    : `${styles["arrowButtonContainer"]} ${styles["flat"]}  ${styles["right"]}`
                }
                onClick={() => clickHandler("R")}
              >
                <Arrow direction={"right"} />
              </button>
            )}
          </div>
        </div>
        {props.dotsNavigation && (
          <div
            className={
              props.dotsNavigationInside
                ? `${styles["navContainer"]} ${styles["inside"]}`
                : `${styles["navContainer"]}`
            }
          >
            <DotsNavigation
              items={showItems}
              selectedIndex={showingIndex}
              jumpToIndex={jumpToIndexHandler}
              dotNavigationOutlineColor={
                props.dotNavigationOutlineColor ?? "rgb(220,220,220,1)"
              }
              dotNavigationFillColor={
                props.dotNavigationFillColor ?? "rgb(220,220,220,1)"
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Carousel;
