import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CardItem from "./Components/CardItem";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import CustomButton from "./Components/CustomButton";
import { useState } from "react";
import type { LayoutItem, BreakpointType } from "../types";
import cloneDeep from "lodash.clonedeep";
import type { Layouts } from "react-grid-layout";
import { ToggleView } from "./Components/ToggleButton";
import { useAppStore } from "./stores/useStore";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function App({
  isDark,
  toggleTheme,
}: {
  isDark: boolean;
  toggleTheme: () => void;
}) {
  const {
    view,
    cards,
    galleryLayouts,
    listLayouts,
    setView,
    setCards,
    setGalleryLayouts,
    setListLayouts,
  } = useAppStore();
  const columnCounts =
    view === "list"
      ? { lg: 1, md: 1, sm: 1, xs: 1 }
      : { lg: 6, md: 4, sm: 3, xs: 2 };

  const currentLayouts = view === "gallery" ? galleryLayouts : listLayouts;

  function getNextPosition(
    breakpoint: string,
    layout: LayoutItem[],
    cols: number
  ) {
    const w = breakpoint === "sm" ? 3 : 2;
    const h = 7;

    const colHeights = Array(cols).fill(0);
    for (const item of layout) {
      for (let x = item.x; x < item.x + item.w; x++) {
        colHeights[x] = Math.max(colHeights[x], item.y + item.h);
      }
    }

    let minY = Infinity;
    let bestX = 0;
    for (let x = 0; x <= cols - w; x++) {
      let maxYInBlock = 0;
      for (let i = 0; i < w; i++) {
        maxYInBlock = Math.max(maxYInBlock, colHeights[x + i]);
      }
      if (maxYInBlock < minY) {
        minY = maxYInBlock;
        bestX = x;
      }
    }

    return { x: bestX, y: minY, w, h };
  }

  const [cardName, setCardName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim()) return;

    const newId = `card-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const newCard = { id: newId, text: cardName, isVisible: true };
    setCards([...cards, newCard]);

    setCardName("");

    const updatedGallery = cloneDeep(galleryLayouts);
    const updatedList = cloneDeep(listLayouts);

    for (const key of Object.keys(updatedGallery) as BreakpointType[]) {
      const layout = updatedGallery[key];
      const { x, y, w, h } = getNextPosition(key, layout, columnCounts[key]);
      layout.push({ i: newId, x, y, w, h });
    }

    for (const key of Object.keys(updatedList) as BreakpointType[]) {
      const layout = updatedList[key];
      const y =
        layout.length > 0
          ? Math.max(...layout.map((item) => item.y + item.h))
          : 0;
      layout.push({ i: newId, x: 0, y, w: 1, h: 7 });
    }

    setGalleryLayouts(updatedGallery);
    setListLayouts(updatedList);
  };

  const toggleVisibility = (id: string) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, isVisible: !card.isVisible } : card
      )
    );

    const updateVisibilityInLayouts = (layouts: Layouts): Layouts => {
      const updated = cloneDeep(layouts);

      (Object.keys(updated) as BreakpointType[]).forEach((key) => {
        updated[key] = updated[key].map((item) => {
          if (item.i !== id) return item;

          const isHidden = item.h === 1;
          const visibleW = key === "sm" ? 3 : 2;
          const hiddenW = 1;

          return {
            ...item,
            h: isHidden ? 7 : 1,
            w: isHidden ? visibleW : hiddenW,
          };
        });
      });

      return updated;
    };

    setGalleryLayouts(updateVisibilityInLayouts(galleryLayouts));
    setListLayouts(updateVisibilityInLayouts(listLayouts));
  };
  const handleDelete = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));

    const removeFromLayouts = (layouts: Layouts): Layouts => {
      const updated = cloneDeep(layouts);

      (Object.keys(updated) as BreakpointType[]).forEach((key) => {
        updated[key] = updated[key].filter((item) => item.i !== id);
      });

      return updated;
    };

    setGalleryLayouts(removeFromLayouts(galleryLayouts));
    setListLayouts(removeFromLayouts(listLayouts));
  };

  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<BreakpointType>("lg");

  return (
    <>
      <DarkModeSwitch
        style={{ marginBottom: "2rem" }}
        checked={isDark}
        onChange={toggleTheme}
        size={120}
      />
      <ToggleView isDark={isDark} view={view} setView={setView} />
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mx-auto w-75 mt-5">
          <Form.Control
            type="text"
            placeholder="Kart ismi..."
            value={cardName}
            className={isDark ? "no-focus-dark-form" : "no-focus-form"}
            onChange={(e) => setCardName(e.target.value)}
          />
          <CustomButton>Yeni kart ekle </CustomButton>
        </InputGroup>
      </Form>
      <ResponsiveGridLayout
        key={view}
        onBreakpointChange={(breakpoint) => {
          setCurrentBreakpoint(breakpoint as BreakpointType);
        }}
        layouts={currentLayouts}
        onLayoutChange={(_, allLayouts) => {
          const cols = columnCounts[currentBreakpoint];
          const isValid = allLayouts[currentBreakpoint].every(
            (item) => item.x + item.w <= cols
          );
          if (!isValid) return;

          if (view === "gallery") setGalleryLayouts(allLayouts);
          else setListLayouts(allLayouts);
        }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={columnCounts}
        rowHeight={33}
        isDraggable={true}
        isResizable={true}
        margin={[32, 32]}
        containerPadding={[96, 64]}
        resizeHandles={["se", "sw", "ne", "nw", "n", "s", "e", "w"]}
      >
        {currentLayouts[currentBreakpoint].map((layoutItem) => {
          const card = cards.find((c) => c.id === layoutItem.i);
          if (!card) return null;

          return (
            <div
              key={card.id}
              className={
                card.isVisible ? "card-wrapper" : "card-wrapper no-resize"
              }
              style={{ zIndex: 10, pointerEvents: "auto" }}
            >
              <CardItem
                text={card.text}
                isVisible={card.isVisible}
                onToggle={() => toggleVisibility(card.id)}
                onDelete={() => handleDelete(card.id)}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </>
  );
}
