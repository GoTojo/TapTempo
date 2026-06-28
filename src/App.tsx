import { useRef, useState } from "react";

export default function App() {
  const [bpm, setBpm] = useState<number | null>(null);
  const tapsRef = useRef<number[]>([]);

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || navigator.maxTouchPoints > 1;

  const handleTap = () => {
    const now = performance.now();

    tapsRef.current.push(now);

    if (tapsRef.current.length > 5) {
      tapsRef.current.shift();
    }

    if (tapsRef.current.length < 2) return;

    const intervals: number[] = [];
    for (let i = 1; i < tapsRef.current.length; i++) {
      intervals.push(tapsRef.current[i] - tapsRef.current[i - 1]);
    }

    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;

    const bpmValue = Math.round(60000 / avg);
    setBpm(bpmValue);
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
      {bpm ? `${bpm}` : "Tap to start"}
    </div>
  );
}
