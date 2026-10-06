import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOVERA - Technology That Moves Your Business Forward",
  description: "NOVERA builds custom software, digital systems, automation, and AI-powered solutions that help businesses operate smarter and scale with confidence.",
};

import NextTopLoader from 'nextjs-toploader';

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <div className="relative flex flex-col min-h-screen overflow-x-hidden">
          <NextTopLoader 
            color="hsl(var(--primary))" 
            showSpinner={false}
            height={3}
            easing="ease"
            speed={200}
            shadow="0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--primary))"
          />
          {children}
        </div>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
