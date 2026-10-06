import React from 'react';

export default function AdminLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-pulse p-4 md:p-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-2">
        <div className="space-y-2">
          <div className="h-7 w-32 bg-muted rounded-md" />
          <div className="h-4 w-64 bg-muted/60 rounded" />
        </div>
        <div className="h-10 w-28 bg-muted rounded-md" />
      </div>

      {/* Main Content/Table Skeleton */}
      <div className="bg-background border border-border/50 rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-border/50 bg-muted/20">
          <div className="h-4 w-1/4 bg-muted rounded" />
          <div className="h-4 w-1/4 bg-muted rounded" />
          <div className="h-4 w-1/4 bg-muted rounded" />
          <div className="h-4 w-1/4 bg-muted rounded flex justify-end" />
        </div>
        
        {/* Table Rows */}
        <div className="divide-y divide-border/50">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4">
              <div className="h-4 w-1/4 bg-muted rounded" />
              <div className="h-4 w-1/4 bg-muted/60 rounded" />
              <div className="h-4 w-1/4 bg-muted/60 rounded" />
              <div className="flex justify-end w-1/4 gap-2">
                <div className="h-8 w-8 bg-muted rounded-md" />
                <div className="h-8 w-8 bg-muted rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
