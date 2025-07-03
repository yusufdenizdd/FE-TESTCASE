import GalleryViewIcon from "../assets/GalleryViewIcon.tsx";
import ListViewIcon from "../assets/ListViewIcon.tsx";
import type { ToggleViewProps } from "../../types";

export const ToggleView = ({ isDark, view, setView }: ToggleViewProps) => {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "100px",
        backgroundColor: isDark ? "#521110" : "rgb(230, 183, 182) ",
        position: "fixed",
        width: "140px",
        height: "32px",
        top: "8px",
        right: "10px",
        zIndex: "20",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          backgroundColor: isDark ? "#400e0d" : " #fecccb",
          borderRadius: "40px",
          transition: "transform 0.3s ease",
          transform: view === "gallery" ? "translateX(0)" : "translateX(100%)",
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          cursor: "pointer",
        }}
        onClick={() => setView("gallery")}
      >
        <GalleryViewIcon color={isDark ? "white" : "black"} />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          cursor: "pointer",
          height: "100%",
        }}
        onClick={() => setView("list")}
      >
        <ListViewIcon color={isDark ? "white" : "black"} />
      </div>
    </div>
  );
};
