"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const swipeThreshold = 50; // pixels

export function CinematicTransition({ 
  children,
  maxWidth = "max-w-md" 
}: { 
  children: React.ReactNode;
  maxWidth?: string;
}) {
  const [[page, direction], setPage] = useState([0, 0]);
  const shouldReduceMotion = useReducedMotion();
  const cards = React.Children.toArray(children);

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < cards.length) {
      setPage([newPage, newDirection]);
    }
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: shouldReduceMotion ? 0 : (direction > 0 ? 120 : -120),
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.85,
        rotateY: shouldReduceMotion ? 0 : (direction > 0 ? -35 : 35),
        filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: shouldReduceMotion ? 0 : (direction > 0 ? -120 : 120),
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.85,
        rotateY: shouldReduceMotion ? 0 : (direction > 0 ? 35 : -35),
        filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
      };
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* 1600px perspective gives a very professional, deep 3D feel without being gaming-like */}
      <div className="relative w-full" style={{ perspective: 1600 }}>
        {/* popLayout handles making exiting elements position:absolute automatically so the entering one snaps into place smoothly */}
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 28 },
              opacity: { duration: 0.35 },
              scale: { duration: 0.35, ease: "easeOut" },
              rotateY: { duration: 0.4, ease: "easeOut" },
              filter: { duration: 0.35 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -swipeThreshold) {
                paginate(1);
              } else if (offset.x > swipeThreshold) {
                paginate(-1);
              }
            }}
            className="w-full flex justify-center cursor-grab active:cursor-grabbing p-4"
          >
            <div className={`w-full ${maxWidth} pointer-events-auto`}>
              {cards[page]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimal Pagination Dots */}
      <div className="flex gap-4 mt-8 z-10">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx !== page) {
                setPage([idx, idx > page ? 1 : -1]);
              }
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-400 ease-out ${
              idx === page ? "bg-primary scale-[1.3] ring-4 ring-primary/20" : "bg-primary/20 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
