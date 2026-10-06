"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, X, Code2, Database, Bot, Network, Lightbulb } from "lucide-react";
import React from "react";

const iconMap = {
  Code2,
  Database,
  Bot,
  Network,
  Lightbulb
};

export type IconName = keyof typeof iconMap;

export interface FeatureModalProps {
  isId: boolean;
  iconName: IconName;
  title: string;
  shortDesc: string;
  overview: string;
  capabilities: string[];
  useCases?: string;
  technology?: string;
  ctaText?: string;
}

export function FeatureCardModal({
  isId,
  iconName,
  title,
  shortDesc,
  overview,
  capabilities,
  useCases,
  technology,
  ctaText
}: FeatureModalProps) {
  const Icon = iconMap[iconName] || Code2;
  return (
    <Dialog>
      <DialogTrigger className="text-left w-full group bg-background border border-border/50 rounded-2xl p-4 md:p-6 hover:border-primary/50 transition-colors h-full flex flex-col justify-between cursor-pointer hover:shadow-xl hover:-translate-y-1">
          <div>
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-base md:text-xl font-bold font-heading mb-2 md:mb-3 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">{shortDesc}</p>
          </div>
          <div className="flex items-center text-primary text-xs md:text-sm font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
            {isId ? "Lihat Detail" : "View Details"} <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] w-[calc(100%-24px)] max-h-[85vh] overflow-y-auto overflow-x-hidden p-0 gap-0 border-border/50 rounded-2xl">
        <div className="p-6 md:p-10 w-full flex flex-col min-w-0">
          <DialogHeader className="mb-8 border-b border-border/40 pb-6 text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <DialogTitle className="text-xl md:text-xl font-heading font-bold">{title}</DialogTitle>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {overview}
            </p>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10 w-full">
            <div className="min-w-0">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">{isId ? "Kapabilitas Utama" : "Core Capabilities"}</h4>
              <ul className="space-y-3">
                {capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-foreground/80 leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-8 min-w-0">
              {useCases && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">{isId ? "Konteks Penggunaan (Use Cases)" : "Use Cases"}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{useCases}</p>
                </div>
              )}
              {technology && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">{isId ? "Teknologi" : "Technology Stack"}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{technology}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-muted/30 border border-border/50 p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-heading font-bold text-lg mb-2">{isId ? "Siap untuk mengimplementasikan?" : "Ready to implement?"}</h4>
              <p className="text-sm text-muted-foreground">
                {isId ? "Diskusikan kebutuhan spesifik Anda dengan arsitek kami." : "Discuss your specific requirements with our architects."}
              </p>
            </div>
            <Link href="/start-a-project" className="w-full md:w-auto shrink-0">
              <Button size="lg" className="w-full h-12">
                {ctaText || (isId ? "Mulai Proyek" : "Discuss Project")}
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
