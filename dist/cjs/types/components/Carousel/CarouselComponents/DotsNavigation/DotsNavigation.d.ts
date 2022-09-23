/// <reference types="react" />
import { ListItem } from "../Carousel";
declare type DotsNavigationProps = {
    items: ListItem[] | undefined;
    selectedIndex: number;
    jumpToIndex: (index: number) => void;
    dotNavigationOutlineColor?: string;
    dotNavigationFillColor?: string;
};
export declare const DotsNavigation: (props: DotsNavigationProps) => JSX.Element;
export {};
