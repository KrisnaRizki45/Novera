"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, FileText, BarChart, Settings, LogOut, ChevronRight, MessageSquare } from 'lucide-react';
import { SignOutButton } from './_components/sign-out-button';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/leads', icon: MessageSquare },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Solutions', href: '/admin/solutions', icon: BarChart },
  { name: 'Careers', href: '/admin/careers', icon: Users },
  { name: 'Insights (Blog)', href: '/admin/insights', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }
  return (
    <div className="flex h-screen bg-muted/20">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r border-border/50 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Link href="/admin" className="font-heading font-bold text-xl tracking-tight text-foreground flex items-center">
            NOVERA <span className="text-primary text-xs ml-2 bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">Admin</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground group transition-colors"
            >
              <item.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-border/50">
          <SignOutButton />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header (Mobile & Title) */}
        <header className="h-16 bg-background border-b border-border/50 flex items-center px-6 shrink-0 md:justify-end justify-between">
           <div className="md:hidden font-heading font-bold text-lg">NOVERA Admin</div>
           <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
               AD
             </div>
           </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
