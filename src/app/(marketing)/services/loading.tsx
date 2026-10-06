import React from 'react';

export default function ServicesLoading() {
  return (
    <div className="w-full min-h-screen animate-pulse bg-background">
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-20 px-4 bg-muted/10 border-b border-border/50">
        <div className="container mx-auto max-w-5xl text-center flex flex-col items-center">
          <div className="h-6 w-32 bg-primary/20 rounded-full mb-6" />
          <div className="h-16 md:h-24 w-3/4 max-w-3xl bg-muted rounded-2xl mb-6" />
          <div className="h-6 w-2/3 max-w-2xl bg-muted rounded-lg mb-10" />
          <div className="flex gap-4">
            <div className="h-12 w-40 bg-muted rounded-full" />
            <div className="h-12 w-40 bg-muted rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-8 border border-border/50 rounded-3xl bg-card">
                <div className="w-14 h-14 bg-muted rounded-2xl mb-6" />
                <div className="h-6 w-2/3 bg-muted rounded-lg mb-4" />
                <div className="space-y-2 mb-8">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-5/6 bg-muted rounded" />
                  <div className="h-4 w-4/6 bg-muted rounded" />
                </div>
                <div className="h-4 w-32 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
