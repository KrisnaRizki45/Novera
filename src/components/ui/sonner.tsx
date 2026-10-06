"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, CircleXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme="light"
      className="toaster group !right-4 !top-4 !left-auto sm:!right-8 sm:!top-8"
      position="top-right"
      icons={{
        success: <CircleCheckIcon className="size-5 text-emerald-500" />,
        info: <InfoIcon className="size-5 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <CircleXIcon className="size-5 text-rose-500" />,
        loading: <Loader2Icon className="size-5 text-muted-foreground animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "!bg-white !text-zinc-900 !border !border-zinc-200 !shadow-2xl !rounded-xl !pointer-events-auto !w-max !max-w-[calc(100vw-2rem)]",
          description: "!text-zinc-500",
          title: "font-semibold",
          closeButton: "!bg-zinc-100 hover:!bg-zinc-200 !text-zinc-600 hover:!text-zinc-900 !border-none !rounded-full",
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
