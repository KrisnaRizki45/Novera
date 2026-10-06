"use client";

import { motion } from "framer-motion";
import React from "react";

const clients = [
  "ACME Corp",
  "GlobalTech",
  "Nexus Industries",
  "Stark Logistics",
  "Wayne Finance",
  "Umbrella Corp",
  "Cyberdyne",
  "Initech"
];

// Duplicate the array to create a seamless loop
const duplicatedClients = [...clients, ...clients, ...clients];

// Controlled abstract positioning (Staggered Offsets)
// This prevents the logos from looking too flat/rigid.
const getOffset = (index: number) => {
  const patterns = [
    "-translate-y-3 md:-translate-y-5",
    "translate-y-2 md:translate-y-4",
    "-translate-y-1 md:-translate-y-2",
    "translate-y-4 md:translate-y-7",
    "-translate-y-4 md:-translate-y-6",
    "translate-y-1 md:translate-y-2",
    "-translate-y-2 md:-translate-y-3",
    "translate-y-3 md:translate-y-5"
  ];
  return patterns[index % patterns.length];
};

export function ClientMarquee() {
  return (
    <div className="w-full overflow-hidden py-16 md:py-12 relative flex flex-col items-center justify-center">
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex items-center gap-16 md:gap-32 w-max py-4"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40, 
        }}
      >
        {duplicatedClients.map((client, idx) => (
          <div 
            key={idx} 
            className={`flex-shrink-0 text-xl md:text-2xl font-heading font-bold text-muted-foreground/40 hover:text-foreground transition-all duration-700 cursor-default ${getOffset(idx)}`}
          >
            {client}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
