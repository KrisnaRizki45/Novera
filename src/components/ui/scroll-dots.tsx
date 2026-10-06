"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ScrollDots({ containerId, count }: { containerId: string, count: number }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = document.getElementById(containerId);
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const child = el.firstElementChild as HTMLElement;
      if (!child) return;
      
      // Calculate width including gap roughly, or just use bounding client rects.
      // Since children are snap-center or snap-start, we can check which child is closest to center.
      const containerCenter = el.getBoundingClientRect().left + el.clientWidth / 2;
      
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(el.children).forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(Math.min(Math.max(closestIndex, 0), count - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();
    
    // Add resize listener just in case layout changes
    window.addEventListener("resize", handleScroll);
    
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerId, count]);

  const handleDotClick = (index: number) => {
    const el = document.getElementById(containerId);
    if (!el) return;
    const child = el.children[index] as HTMLElement;
    if (!child) return;
    
    // Smooth scroll to the clicked item
    el.scrollTo({
      left: child.offsetLeft - 16, // account for padding
      behavior: 'smooth'
    });
  };

  if (count <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <button 
          key={i} 
          onClick={() => handleDotClick(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={cn(
            "h-2 rounded-full transition-all duration-500 ease-out",
            activeIndex === i 
              ? "w-8 bg-primary" 
              : "w-2 bg-primary/20 hover:bg-primary/40 cursor-pointer"
          )}
        />
      ))}
    </div>
  );
}
