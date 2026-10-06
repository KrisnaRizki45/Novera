import React from 'react';

export default function MarketingLoading() {
  return (
    <div className="w-full min-h-screen animate-pulse pt-32 pb-20">
      {/* Hero Skeleton */}
      <div className="container mx-auto max-w-5xl px-4 flex flex-col items-center text-center space-y-6 mb-24">
        <div className="h-8 w-48 bg-muted rounded-full" />
        <div className="h-16 md:h-24 w-3/4 max-w-3xl bg-muted rounded-2xl" />
        <div className="h-6 w-2/3 max-w-2xl bg-muted rounded-lg" />
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-32 bg-muted rounded-full" />
          <div className="h-12 w-32 bg-muted rounded-full" />
        </div>
      </div>

      {/* Grid Skeleton (Services/Solutions) */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col space-y-4 p-8 border border-border/50 rounded-3xl bg-card">
              <div className="w-12 h-12 bg-muted rounded-2xl" />
              <div className="h-6 w-3/4 bg-muted rounded-lg" />
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
                <div className="h-4 w-4/6 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
