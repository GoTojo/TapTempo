import { useRef, useState } from "react";

export default function App() {
  const [bpm, setBpm] = useState<number | null>(null);
  const lastTapRef = useRef<number | null>(null);

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || navigator.maxTouchPoints > 1;

  const handleTap = () => {
    const now = performance.now();

    if (lastTapRef.current) {
      const diff = now - lastTapRef.current;
      const bpmValue = Math.round(60000 / diff);
      setBpm(bpmValue);
    }

    lastTapRef.current = now;
  };

  return (
    <div
      onTouchStart={isMobile ? handleTap : undefined}
      onMouseDown={!isMobile ? handleTap : undefined}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "4rem",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "none",
      }}
    >
      {bpm ? `${bpm} BPM` : "Tap to start"}
    </div>
  );
}
