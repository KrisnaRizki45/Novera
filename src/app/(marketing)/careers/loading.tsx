import React from 'react';

export default function CareersLoading() {
  return (
    <div className="w-full min-h-screen animate-pulse bg-background">
      {/* Hero Skeleton */}
      <section className="pt-40 pb-20 px-4 bg-muted/10 border-b border-border/50">
        <div className="container mx-auto max-w-5xl text-center flex flex-col items-center">
          <div className="h-6 w-40 bg-primary/20 rounded-full mb-6" />
          <div className="h-16 md:h-24 w-3/4 max-w-3xl bg-muted rounded-2xl mb-6" />
          <div className="h-6 w-2/3 max-w-2xl bg-muted rounded-lg" />
        </div>
      </section>

      {/* Culture Section Skeleton */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="h-8 w-64 bg-muted rounded-lg mx-auto mb-16" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-muted/10 border border-border/50 rounded-2xl text-left">
                <div className="w-8 h-8 bg-muted rounded-full mb-4" />
                <div className="h-6 w-3/4 bg-muted rounded-lg mb-2" />
                <div className="h-4 w-full bg-muted rounded mb-1" />
                <div className="h-4 w-5/6 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job List Skeleton */}
      <section className="py-16 px-4 bg-muted/5 border-y border-border/50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="h-8 w-48 bg-muted rounded-lg" />
            <div className="h-10 w-full md:w-64 bg-muted rounded-full" />
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 bg-card border border-border/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-1/2 md:w-1/3 bg-muted rounded-lg" />
                  <div className="flex gap-4">
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-4 w-24 bg-muted rounded" />
                  </div>
                </div>
                <div className="h-10 w-full md:w-32 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
