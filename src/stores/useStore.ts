import { create } from "zustand";
import type { Layouts } from "react-grid-layout";
import type { Card, ViewType, BreakpointType } from "../../types";
import cloneDeep from "lodash.clonedeep";

const getKey = (username: string, key: string) => `${username}-${key}`;

const getInitialLayouts = (username: string): Layouts => {
  const stored = localStorage.getItem(getKey(username, "galleryLayouts"));
  return stored
    ? JSON.parse(stored)
    : {
        lg: [
          { i: `${username}-card-1`, x: 0, y: 0, w: 2, h: 7 },
          { i: `${username}-card-2`, x: 2, y: 0, w: 2, h: 7 },
          { i: `${username}-card-3`, x: 4, y: 0, w: 2, h: 7 },
        ],
        md: [
          { i: `${username}-card-1`, x: 0, y: 0, w: 2, h: 7 },
          { i: `${username}-card-2`, x: 2, y: 0, w: 2, h: 7 },
          { i: `${username}-card-3`, x: 0, y: 7, w: 2, h: 7 },
        ],
        sm: [
          { i: `${username}-card-1`, x: 0, y: 0, w: 3, h: 7 },
          { i: `${username}-card-2`, x: 0, y: 7, w: 3, h: 7 },
          { i: `${username}-card-3`, x: 0, y: 14, w: 3, h: 7 },
        ],
        xs: [
          { i: `${username}-card-1`, x: 0, y: 0, w: 2, h: 7 },
          { i: `${username}-card-2`, x: 0, y: 7, w: 2, h: 7 },
          { i: `${username}-card-3`, x: 0, y: 14, w: 2, h: 7 },
        ],
      };
};

const getInitialCards = (username: string): Card[] => {
  const stored = localStorage.getItem(getKey(username, "cards"));
  return stored
    ? JSON.parse(stored)
    : [
        { id: `${username}-card-1`, text: "deneme1", isVisible: true },
        { id: `${username}-card-2`, text: "deneme2", isVisible: true },
        { id: `${username}-card-3`, text: "deneme3", isVisible: true },
      ];
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
  username: string;
  isLogged: boolean;
  view: ViewType;
  cards: Card[];
  galleryLayouts: Layouts;
  listLayouts: Layouts;

  setUsername: (username: string) => void;
  setIsLogged: () => void;
  setView: (view: ViewType) => void;
  setCards: (cards: Card[]) => void;
  setGalleryLayouts: (layouts: Layouts) => void;
  setListLayouts: (layouts: Layouts) => void;
}
const storedUsername = localStorage.getItem("username") ?? "";
export const useAppStore = create<AppState>((set, get) => ({
  username: storedUsername,
  isLogged: storedUsername !== "",
  view: (localStorage.getItem("view") as ViewType) ?? "gallery",
  cards: getInitialCards(storedUsername),
  galleryLayouts: getInitialLayouts(storedUsername),
  listLayouts: adjustLayoutForView(getInitialLayouts(storedUsername), "list"),

  setUsername: (username) => {
    localStorage.setItem("username", username);
    set({
      username,
      cards: getInitialCards(username),
      galleryLayouts: getInitialLayouts(username),
      listLayouts: adjustLayoutForView(getInitialLayouts(username), get().view),
    });
  },

  setIsLogged: () =>
    set((state) => ({
      isLogged: !state.isLogged,
    })),

  setView: (view) => {
    localStorage.setItem("view", view);
    set({ view });
  },

  setCards: (cards) => {
    const username = get().username;
    localStorage.setItem(getKey(username, "cards"), JSON.stringify(cards));
    set({ cards });
  },

  setGalleryLayouts: (layouts) => {
    const username = get().username;
    localStorage.setItem(
      getKey(username, "galleryLayouts"),
      JSON.stringify(layouts)
    );
    set({ galleryLayouts: layouts });
  },

  setListLayouts: (layouts) => {
    const username = get().username;
    localStorage.setItem(
      getKey(username, "listLayouts"),
      JSON.stringify(layouts)
    );
    set({ listLayouts: layouts });
  },
}));
