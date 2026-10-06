"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/fade-in";

type FAQItem = {
  q: string;
  a: React.ReactNode;
};

export function FAQAccordion({ 
  faqs, 
  title, 
  description 
}: { 
  faqs: FAQItem[], 
  title: string, 
  description?: string 
}) {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">{title}</h2>
            {description && <p className="text-muted-foreground text-sm max-w-xl mx-auto">{description}</p>}
          </div>
          <Accordion className="w-full space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`} 
                className="bg-background border border-border/50 rounded-lg px-5 data-[state=open]:border-primary/40 data-[state=open]:shadow-sm transition-all shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-[15px] hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
