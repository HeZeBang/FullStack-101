import { ReactNode } from "react";

export interface SlideT {
    id?: any,
    title: string;
    content: ReactNode,
}

export interface SlidesProps {
  data: SlideT[];
}