import { ReactNode } from "react";

export interface SlideT {
    id?: any,
    title?: string;
    subtitle?: string;
    content: ReactNode,
    layout?: string;
    autoAnimate?: boolean;
}

export interface SlidesProps {
  data: SlideT[];
  title?: string | ReactNode;
  extra?: string | ReactNode;
  subtitle?: string | ReactNode;
}