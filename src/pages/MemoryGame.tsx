import { useState, useCallback, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Star, Zap } from "lucide-react";
import SEO from "@/components/SEO";

const EMOJIS = [
  "🐶", "🌈", "⭐", "🎈", "🍎", "🦋", "🌻", "🐱", "🎸", "🍕",
  "🚀", "🎯", "🐸", "🌙", "🍩", "🦄", "🎨", "🐝", "🍓", "🌺",
  "🐳", "🎪", "🍭", "🦊", "🌸",
];

const LEVELS = [
  { tiles: 8, cols: 4 },
  { tiles: 12, cols: 4 },
  { tiles: 16, cols: 4 },
  { tiles: 20, cols: 5 },
  { tiles: 30, cols: 6 },
  { tiles: 40, cols: 8 },
  { tiles: 50, cols: 10 },
];

interface Tile {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
  removed: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTiles(count: number): Tile[] {
  const picked = shuffle(EMOJIS).slice(0, count / 2);
  return shuffle([...picked, ...picked].map((emoji, i) => ({
    id: i,
    emoji,
    flipped: false,
    matched: false,
    removed: false,
  })));
}

const MemoryGame = () => {
  const [level, setLevel] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>(() => buildTiles(LEVELS[0].tiles));
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const lockRef = useRef(false);

  const matchedPairs = tiles.filter((t) => t.matched).length / 2;
  const totalPairs = tiles.length / 2;
  const levelConfig = LEVELS[level];
  const middlePair = Math.ceil(totalPairs / 2);

  const resetLevel = useCallback((lvl: number) => {
    setTiles(buildTiles(LEVELS[lvl].tiles));
    setFlippedIds([]);
    lockRef.current = false;
  }, []);

  const handleRestart = () => {
    resetLevel(level);
  };

  // Confetti on 1st, middle, and last match
  useEffect(() => {
    if (matchedPairs > 0 && (matchedPairs === 1 || matchedPairs === middlePair || matchedPairs === totalPairs)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    }
  }, [matchedPairs, middlePair, totalPairs]);

  // Check level complete
  useEffect(() => {
    if (matchedPairs === totalPairs && totalPairs > 0) {
      setTimeout(() => {
        if (level < LEVELS.length - 1) {
          const next = level + 1;
          setLevel(next);
          resetLevel(next);
        } else {
          setGameComplete(true);
        }
      }, 2500);
    }
  }, [matchedPairs, totalPairs, level, resetLevel]);

  const handleFlip = (id: number) => {
    if (lockRef.current) return;
    const tile = tiles.find((t) => t.id === id);
    if (!tile || tile.flipped || tile.matched || tile.removed) return;
    if (flippedIds.length >= 2) return;

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);
    setTiles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, flipped: true } : t))
    );

    if (newFlipped.length === 2) {
      lockRef.current = true;
      const [aId, bId] = newFlipped;

      setTimeout(() => {
        const currentTiles = tiles.map((t) =>
          t.id === id ? { ...t, flipped: true } : t
        );
        const tileA = currentTiles.find((t) => t.id === aId)!;
        const tileB = currentTiles.find((t) => t.id === bId)!;

        if (tileA.emoji === tileB.emoji) {
          // Match found
          setTiles((prev) =>
            prev.map((t) =>
              t.id === aId || t.id === bId ? { ...t, matched: true } : t
            )
          );
          setScore((s) => s + 10);
          setFlippedIds([]);
          lockRef.current = false;

          // Remove after brief delay
          setTimeout(() => {
            setTiles((p) =>
              p.map((t) =>
                t.id === aId || t.id === bId ? { ...t, removed: true } : t
              )
            );
          }, 500);
        } else {
          // No match — flip back
          setTimeout(() => {
            setTiles((p) =>
              p.map((t) =>
                t.id === aId || t.id === bId ? { ...t, flipped: false } : t
              )
            );
            setFlippedIds([]);
            lockRef.current = false;
          }, 1500);
        }
      }, 100);
    }
  };

  const tileSize =
    levelConfig.tiles <= 16
      ? "w-16 h-16 sm:w-20 sm:h-20 text-3xl"
      : levelConfig.tiles <= 30
      ? "w-14 h-14 sm:w-16 sm:h-16 text-2xl"
      : "w-12 h-12 sm:w-14 sm:h-14 text-xl";

  return (
    <div className="min-h-screen flex flex-col bg-background bg-gradient-to-br from-primary/8 via-accent/15 to-primary/5">
      <SEO title="Memory Game" description="Play a fun memory matching game designed to help children improve focus and concentration skills." path="/memory-game" />
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-20 pb-8 px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground drop-shadow-lg mb-6">
              🧠 Memory Focus Game
            </h1>

            {/* Stats Bar */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6 flex-wrap">
              <div className="bg-white/80 backdrop-blur rounded-xl px-4 py-2 flex items-center gap-2 shadow">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="font-bold text-foreground">Level {level + 1}</span>
                <span className="text-muted-foreground text-sm">/ {LEVELS.length}</span>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl px-4 py-2 flex items-center gap-2 shadow">
                <Star className="h-5 w-5 text-orange-500" />
                <span className="font-bold text-foreground">{score}</span>
                <span className="text-muted-foreground text-sm">pts</span>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl px-4 py-2 flex items-center gap-2 shadow">
                <Trophy className="h-5 w-5 text-emerald-500" />
                <span className="font-bold text-foreground">
                  {matchedPairs}/{totalPairs}
                </span>
              </div>
            </div>

            {gameComplete ? (
              <div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-foreground">🎉 You Won!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Amazing! You completed all {LEVELS.length} levels with {score} points!
                </p>
                <Button
                  onClick={() => {
                    setLevel(0);
                    setScore(0);
                    setGameComplete(false);
                    resetLevel(0);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                  size="lg"
                >
                  Play Again
                </Button>
              </div>
            ) : (
              <>
                {/* Game Grid */}
                <div
                  className="inline-grid gap-2 sm:gap-3 mb-6"
                  style={{
                    gridTemplateColumns: `repeat(${levelConfig.cols}, minmax(0, 1fr))`,
                    perspective: "1000px",
                  }}
                >
                  {tiles.map((tile) => {
                    const isOpen = tile.flipped || tile.matched;
                    return (
                      <button
                        key={tile.id}
                        onClick={() => handleFlip(tile.id)}
                        className={`${tileSize} rounded-xl shadow-lg transition-all duration-500 cursor-pointer select-none relative ${
                          tile.removed ? "opacity-0 pointer-events-none" : ""
                        }`}
                        style={{
                          transformStyle: "preserve-3d",
                          transform: isOpen ? "rotateY(180deg)" : "rotateY(0deg)",
                        }}
                        aria-label={isOpen ? tile.emoji : "Hidden tile"}
                        disabled={tile.removed}
                      >
                        {/* Back face (visible when not flipped) */}
                        <div
                          className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <span className="text-white font-bold text-lg">?</span>
                        </div>
                        {/* Front face (visible when flipped) */}
                        <div
                          className={`absolute inset-0 rounded-xl flex items-center justify-center ${
                            tile.matched
                              ? "bg-emerald-100 ring-2 ring-emerald-400"
                              : "bg-white"
                          }`}
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                          }}
                        >
                          {tile.emoji}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Restart */}
                <div>
                  <Button
                    variant="outline"
                    onClick={handleRestart}
                    className="bg-white/80 hover:bg-white"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restart Level
                  </Button>
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      {showConfetti && <ConfettiEffect />}
    </div>
  );
};

export default MemoryGame;
