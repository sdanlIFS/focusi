import { useEffect, useState } from "react";

const COLORS = [
  "#FF6B6B", "#FFE66D", "#4ECDC4", "#A855F7", "#FF69B4",
  "#00D2FF", "#FFA500", "#7CFF01", "#FF4500", "#1E90FF",
];

interface Piece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export const ConfettiEffect = ({ onComplete }: { onComplete?: () => void }) => {
  const [pieces] = useState<Piece[]>(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 1.5,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
    }))
  );

  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: "2px",
            transform: `rotate(${p.rotation}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
