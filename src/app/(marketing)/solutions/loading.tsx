import React from 'react';

export default function SolutionsLoading() {
  return (
    <div className="w-full min-h-screen animate-pulse bg-background">
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-20 px-4 bg-muted/10 border-b border-border/50">
        <div className="container mx-auto max-w-5xl text-center flex flex-col items-center">
          <div className="h-6 w-32 bg-primary/20 rounded-full mb-6" />
          <div className="h-16 md:h-20 w-4/5 max-w-4xl bg-muted rounded-2xl mb-6" />
          <div className="h-6 w-2/3 max-w-2xl bg-muted rounded-lg mb-10" />
        </div>
      </section>

      {/* Solutions Grid Skeleton - Solutions usually have horizontal or staggered layouts, we'll use a staggered grid look */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col p-6 lg:p-8 bg-card border border-border/50 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-muted rounded-2xl" />
                  <div className="h-6 w-1/2 bg-muted rounded-lg" />
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-5/6 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                </div>
                <div className="mt-auto h-10 w-full bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
