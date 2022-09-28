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
  element: React.ReactNode;
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
  // Render the carousel elements based on its setup
  const renderElement = (element: React.ReactNode, index: number) => {
    let style = `${styles["itemContainer"]}`;
    style += is3D ? ` ${styles["threed"]}` : ` ${styles["flat"]}`;
    if (!showItems || !showItems[index]) return;
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

  // State
  let [prevItemStyle, setPrevItemStyle] = useState(` ${styles["prev"]}`);
  let [nextItemStyle, setNextItemStyle] = useState(` ${styles["next"]}`);
  const [showingIndex, setShowingIndex] = useState(0);
  const [showItems, setShowItems] = useState<ListItem[]>();
  const [waiting, setWaiting] = useState(false);
  const [autoScrollClickDelay, setAutoScrollClickDelay] = useState(false);

  const childrenNum = showItems?.length ?? 0;
  const is3D = props.carouselStyle === "3d";

  // Swipeable handlers
  const handlers = useSwipeable({
    onSwipedRight: () => {
      clickHandler("L");
    },
    onSwipedLeft: () => {
      clickHandler("R");
    },
    preventScrollOnSwipe: true,
  });

  // Shifts the carousel left
  const shiftLeft = useCallback(() => {
    setShowingIndex((prev) => {
      if (prev === 0) return childrenNum - 1;
      return prev - 1;
    });
  }, [childrenNum]);

  // Shifts the carousel right
  const shiftRight = useCallback(() => {
    setShowingIndex((prev) => {
      if (prev === childrenNum - 1) {
        return 0;
      }

      return prev + 1;
    });
  }, [childrenNum]);

  // Checks if currently waiting, if not - adjust the CSS styles and call carousel shift
  const rotateCarouselHandler = useCallback(
    (arg0: "L" | "R") => {
      if (waiting === false) {
        setWaiting(true);
        switch (arg0) {
          case "L":
            setPrevItemStyle(` ${styles["prev"]} ${styles["leftClick"]}`);
            setNextItemStyle(` ${styles["next"]} ${styles["leftClick"]}`);
            shiftLeft();
            break;
          case "R":
            setPrevItemStyle(` ${styles["prev"]}`);
            setNextItemStyle(` ${styles["next"]}`);
            shiftRight();
            break;
        }
      }
    },
    [shiftLeft, shiftRight, waiting]
  );

  // Adjusts showItems if props.children or currently showing item change
  useEffect(() => {
    let showItems = React.Children.map(props.children, (child, index) => {
      if (child) return { element: child, isSelected: index === showingIndex };
    });
    if (showItems) {
      setShowItems(showItems);
      console.log("No showitems, setting index to 0");
      if (showingIndex > showItems?.length - 1 || showingIndex < 0)
        setShowingIndex(0);
    } else {
      setShowItems(undefined);
      if (showingIndex !== 0) setShowingIndex(0);
    }
  }, [props.children, showingIndex]);

  // Configures auto-rotate interval
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

  // Configures auto-rotate delay after click
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

  // Takes care of waiting for an action
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

  // Takes in the item index to jump to, calls rotateCarouselHandler
  const jumpToIndexHandler = (index: number) => {
    if (waiting === false) {
      setWaiting(true);
      if (index === prevIndex) {
        rotateCarouselHandler("L");
      } else if (index === nextIndex) {
        rotateCarouselHandler("R");
      } else {
        setShowingIndex(index);
      }
      setAutoScrollClickDelay(true);
    }
  };

  // Arrow click handler
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
              {showItems &&
                showItems.map((listItem, index) => {
                  return renderElement(listItem.element, index);
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
