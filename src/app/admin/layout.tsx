"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, FileText, BarChart, Settings, LogOut, ChevronRight, MessageSquare, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b border-border/50">
        <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="font-heading font-bold text-xl tracking-tight text-foreground flex items-center">
          NOVERA <span className="text-primary text-xs ml-2 bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">Admin</span>
        </Link>
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = item.href === '/admin' 
            ? pathname === '/admin' 
            : pathname === item.href || pathname.startsWith(item.href + '/');
            
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${
                isActive ? 'text-primary' : 'group-hover:text-primary'
              }`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/50">
        <SignOutButton />
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-muted/20">
      {/* Desktop Sidebar */}
      <div className="w-64 bg-background border-r border-border/50 flex flex-col hidden md:flex">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-background border-r border-border/50">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-background border-b border-border/50 flex items-center px-6 shrink-0 justify-between">
           <div className="flex items-center md:hidden">
             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 mr-2 text-muted-foreground hover:text-foreground">
               <Menu className="w-6 h-6" />
             </button>
             <div className="font-heading font-bold text-lg">NOVERA Admin</div>
           </div>
           
           <div className="flex items-center justify-end w-full md:w-auto">
             <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
               AD
             </div>
           </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
