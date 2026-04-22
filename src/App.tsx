import { useState, useRef } from "react";

export default function App() {
  const [bpm, setBpm] = useState<number | null>(null);
  const lastTapRef = useRef<number | null>(null);

  const handleTap = () => {
    const now = performance.now();

    if (lastTapRef.current) {
      const diff = now - lastTapRef.current; // ms
      const bpmValue = Math.round(60000 / diff);
      setBpm(bpmValue);
    }

    lastTapRef.current = now;
  };

  return (
    <div
      onClick={handleTap}
      onTouchStart={handleTap}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "4rem",
        userSelect: "none",
      }}
    >
      {bpm ? `${bpm} BPM` : "Tap to start"}
    </div>
  );
}
