"use client";

import { motion } from "framer-motion";
import { Database, Layout, Server, ShieldCheck, Workflow } from "lucide-react";

export function EnterpriseEcosystem({ isId }: { isId: boolean }) {
  return (
    <div className="relative w-full py-12 md:py-16 flex flex-col items-center justify-center overflow-hidden border-t border-border/30">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 -z-10" />

      {/* Animation Section */}
      <div className="relative w-full max-w-2xl mx-auto aspect-square md:aspect-[2/1] flex items-center justify-center px-4 md:px-0">
        
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
          <line x1="50%" y1="50%" x2="15%" y2="20%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/50" />
          <line x1="50%" y1="50%" x2="85%" y2="20%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/50" />
          <line x1="50%" y1="50%" x2="15%" y2="80%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/50" />
          <line x1="50%" y1="50%" x2="85%" y2="80%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-primary/50" />

          {/* Native SVG SMIL Animations for buttery smooth percentage interpolation */}
          <circle r="4" className="fill-primary">
            <animate attributeName="cx" values="50%;15%;50%" dur="5.5s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            <animate attributeName="cy" values="50%;20%;50%" dur="5.5s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            <animate attributeName="opacity" values="0;1;0" dur="5.5s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
          </circle>
          <circle r="4" className="fill-primary">
            <animate attributeName="cx" values="50%;85%;50%" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            <animate attributeName="cy" values="50%;20%;50%" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
          </circle>
          <circle r="4" className="fill-primary">
            <animate attributeName="cx" values="50%;15%;50%" dur="5.8s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            <animate attributeName="cy" values="50%;80%;50%" dur="5.8s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            <animate attributeName="opacity" values="0;1;0" dur="5.8s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
          </circle>
          <circle r="4" className="fill-primary">
            <animate attributeName="cx" values="50%;85%;50%" dur="6.2s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            <animate attributeName="cy" values="50%;80%;50%" dur="6.2s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            <animate attributeName="opacity" values="0;1;0" dur="6.2s" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
          </circle>
        </svg>

        {/* Central Node */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div 
            className="flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-background border-2 border-primary/50 shadow-[0_0_60px_rgba(var(--primary),0.15)] rounded-3xl backdrop-blur-xl"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Server className="w-10 h-10 md:w-14 md:h-14 text-primary mb-2 md:mb-3" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground">Novera Core</span>
          </motion.div>
        </div>

        {/* Orbiting Nodes */}
        {/* Top Left */}
        <div className="absolute top-[20%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div className="flex flex-col items-center p-4 md:p-5 lg:p-6 bg-background/80 border border-border/60 rounded-2xl md:rounded-3xl backdrop-blur-md shadow-xl"
            animate={{ y: [4, -4, 4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
            <Database className="w-6 h-6 md:w-8 md:h-8 text-primary/80 mb-2" />
            <span className="text-[9px] md:text-xs font-semibold uppercase tracking-wider text-muted-foreground">Big Data</span>
          </motion.div>
        </div>

        {/* Top Right */}
        <div className="absolute top-[20%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div className="flex flex-col items-center p-4 md:p-5 lg:p-6 bg-background/80 border border-border/60 rounded-2xl md:rounded-3xl backdrop-blur-md shadow-xl"
            animate={{ y: [-5, 5, -5] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
            <Layout className="w-6 h-6 md:w-8 md:h-8 text-primary/80 mb-2" />
            <span className="text-[9px] md:text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interfaces</span>
          </motion.div>
        </div>

        {/* Bottom Left */}
        <div className="absolute top-[80%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div className="flex flex-col items-center p-4 md:p-5 lg:p-6 bg-background/80 border border-border/60 rounded-2xl md:rounded-3xl backdrop-blur-md shadow-xl"
            animate={{ y: [5, -5, 5] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
            <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-primary/80 mb-2" />
            <span className="text-[9px] md:text-xs font-semibold uppercase tracking-wider text-muted-foreground">Security</span>
          </motion.div>
        </div>

        {/* Bottom Right */}
        <div className="absolute top-[80%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div className="flex flex-col items-center p-4 md:p-5 lg:p-6 bg-background/80 border border-border/60 rounded-2xl md:rounded-3xl backdrop-blur-md shadow-xl"
            animate={{ y: [-4, 4, -4] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
            <Workflow className="w-6 h-6 md:w-8 md:h-8 text-primary/80 mb-2" />
            <span className="text-[9px] md:text-xs font-semibold uppercase tracking-wider text-muted-foreground">Automation</span>
          </motion.div>
        </div>
      </div>

      {/* Enterprise Badges */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-12 md:mt-16 relative z-30 px-4">
        {["Microservices Architecture", "Cloud-Native Infrastructure", "SOC 2 Compliant", "99.9% Guaranteed Uptime", "Zero Trust Security"].map((badge, i) => (
          <div key={i} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-background border border-border/80 text-[10px] md:text-xs font-semibold text-muted-foreground shadow-sm hover:text-foreground hover:border-primary/50 transition-colors">
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
