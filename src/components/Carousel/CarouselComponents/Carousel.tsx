import * as React from "react";
const { useCallback, useEffect, useState } = React;
import { Arrow } from "../Arrow/Arrow";
import styles from "./Carousel.module.scss";
import { CarouselItem } from "./CarouselItem/CarouselItem";
import { DotsNavigation } from "./DotsNavigation/DotsNavigation";
import { useSwipeable } from "react-swipeable";

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export interface ListItem {
  url: string;
  isSelected: boolean;
}

type CarouselProps = {
  arrows: boolean;
  dotsNavigation: boolean;
  dotsNavigationInside?: boolean;
  dotNavigationOutlineColor?: string;
  dotNavigationFillColor?: string;
  images: string[];
  width: string;
  height: string;
  autoScrollInterval?: number;
  autoScrollClickDelay?: number;
  carouselStyle?: "flat" | "3d";
};

const Carousel = (props: CarouselProps) => {
  const items = props.images;

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
    setShowingIndex((prev) => {
      if (prev === 0) return items.length - 1;
      return prev - 1;
    });
  }, [items.length]);

  const shiftRight = useCallback(() => {
    setShowingIndex((prev) => {
      if (prev === items.length - 1) return 0;
      return prev + 1;
    });
  }, [items.length]);

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
    let showItems = items.map((item, index) => {
      return { url: item, isSelected: index === showingIndex };
    });
    setShowItems(showItems);
  }, [items, showingIndex]);

  useEffect(() => {
    if (
      autoScrollClickDelay === false &&
      props.autoScrollInterval &&
      props.autoScrollInterval > 400
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
      await delay(400);
      setWaiting((prev) => {
        return false;
      });
    };
    if (waiting === true) stopWaiting();
  }, [waiting]);

  let prevIndex = showingIndex === 0 ? items.length - 1 : showingIndex - 1;
  let nextIndex = showingIndex === items.length - 1 ? 0 : showingIndex + 1;

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
              {showItems?.map((showItem, index) => {
                let style = `${styles["itemContainer"]}`;
                style += is3D ? ` ${styles["threed"]}` : ` ${styles["flat"]}`;
                if (showItem.isSelected) {
                  style += ` ${styles["showing"]}`;
                } else if (index === prevIndex) {
                  style += ` ${styles["prev"]}`;
                  return (
                    <span
                      className={style}
                      key={index}
                      onClick={() => clickHandler("L")}
                    >
                      <CarouselItem
                        isShowing={showItem.isSelected}
                        content={showItem.url}
                        height={props.height}
                      />
                    </span>
                  );
                } else if (index === nextIndex) {
                  style += ` ${styles["next"]}`;
                  return (
                    <span
                      className={style}
                      key={index}
                      onClick={() => clickHandler("R")}
                    >
                      <CarouselItem
                        isShowing={showItem.isSelected}
                        content={showItem.url}
                        height={props.height}
                      />
                    </span>
                  );
                }
                return (
                  <span className={style} key={index}>
                    <CarouselItem
                      isShowing={showItem.isSelected}
                      content={showItem.url}
                      height={props.height}
                    />
                  </span>
                );
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
