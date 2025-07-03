/* export interface LayoutTypes {
  lg: LayoutItem[];
  md: LayoutItem[];
  sm: LayoutItem[];
  xs: LayoutItem[];
} */

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type BreakpointType = "lg" | "md" | "sm" | "xs";

export type Card = {
  id: string;
  text: string;
  isVisible: boolean;
};

export type ViewType = "gallery" | "list";

export type ToggleViewProps = {
  isDark: boolean;
  view: ViewType;
  setView: (view: ViewType) => void;
};
