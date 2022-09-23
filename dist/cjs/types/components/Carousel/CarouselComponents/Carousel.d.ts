/// <reference types="react" />
export interface ListItem {
    url: string;
    isSelected: boolean;
}
declare type CarouselProps = {
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
declare const Carousel: (props: CarouselProps) => JSX.Element;
export default Carousel;
