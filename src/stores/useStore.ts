import { create } from "zustand";
import type { Layouts } from "react-grid-layout";
import type { Card, ViewType, BreakpointType } from "../../types";
import cloneDeep from "lodash.clonedeep";

const initialLayouts = {
  lg: [
    { i: "card-1", x: 0, y: 0, w: 2, h: 7 },
    { i: "card-2", x: 2, y: 0, w: 2, h: 7 },
    { i: "card-3", x: 4, y: 0, w: 2, h: 7 },
  ],
  md: [
    { i: "card-1", x: 0, y: 0, w: 2, h: 7 },
    { i: "card-2", x: 2, y: 0, w: 2, h: 7 },
    { i: "card-3", x: 0, y: 7, w: 2, h: 7 },
  ],
  sm: [
    { i: "card-1", x: 0, y: 0, w: 3, h: 7 },
    { i: "card-2", x: 0, y: 7, w: 3, h: 7 },
    { i: "card-3", x: 0, y: 14, w: 3, h: 7 },
  ],
  xs: [
    { i: "card-1", x: 0, y: 0, w: 2, h: 7 },
    { i: "card-2", x: 0, y: 7, w: 2, h: 7 },
    { i: "card-3", x: 0, y: 14, w: 2, h: 7 },
  ],
};

function adjustLayoutForView(layouts: Layouts, view: ViewType): Layouts {
  const columnCounts =
    view === "list"
      ? { lg: 1, md: 1, sm: 1, xs: 1 }
      : { lg: 6, md: 4, sm: 3, xs: 2 };

  const updated = cloneDeep(layouts);

  (Object.keys(updated) as BreakpointType[]).forEach((bp) => {
    const defaultW = view === "list" ? 1 : bp === "sm" ? 3 : 2;
    const cols = view === "list" ? 1 : columnCounts[bp];

    const sorted = [...updated[bp]].sort((a, b) => a.y - b.y);

    updated[bp] = sorted.map((item, index) => {
      const x = view === "list" ? 0 : (index * defaultW) % cols;

      return {
        ...item,
        x,
        w: defaultW,
      };
    });
  });

  return updated;
}

interface AppState {
  view: ViewType;
  cards: Card[];
  galleryLayouts: Layouts;
  listLayouts: Layouts;

  setView: (view: ViewType) => void;
  setCards: (cards: Card[]) => void;
  setGalleryLayouts: (layouts: Layouts) => void;
  setListLayouts: (layouts: Layouts) => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: (localStorage.getItem("view") as ViewType) ?? "gallery",
  cards: localStorage.getItem("cards")
    ? JSON.parse(localStorage.getItem("cards")!)
    : [
        { id: "card-1", text: "deneme1", isVisible: true },
        { id: "card-2", text: "deneme2", isVisible: true },
        { id: "card-3", text: "deneme3", isVisible: true },
      ],
  galleryLayouts: localStorage.getItem("galleryLayouts")
    ? JSON.parse(localStorage.getItem("galleryLayouts")!)
    : initialLayouts,
  listLayouts: localStorage.getItem("listLayouts")
    ? JSON.parse(localStorage.getItem("listLayouts")!)
    : adjustLayoutForView(initialLayouts, "list"),

  setView: (view) => {
    localStorage.setItem("view", view);
    set({ view });
  },
  setCards: (cards) => {
    localStorage.setItem("cards", JSON.stringify(cards));
    set({ cards });
  },
  setGalleryLayouts: (layouts) => {
    localStorage.setItem("galleryLayouts", JSON.stringify(layouts));
    set({ galleryLayouts: layouts });
  },
  setListLayouts: (layouts) => {
    localStorage.setItem("listLayouts", JSON.stringify(layouts));
    set({ listLayouts: layouts });
  },
}));
