import { Loader2 } from "lucide-react";

export default function MarketingLoading() {
  return (
    <div className="flex flex-col min-h-[50vh] pt-20 items-center justify-center p-4">
      <div className="flex items-center gap-3 text-muted-foreground animate-pulse">
        <Loader2 className="w-5 h-5 text-primary/60 animate-spin" />
        <span className="text-sm font-medium tracking-wider uppercase">loading..</span>
      </div>
    </div>
  );
}
