"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Menu, ChevronDown, Monitor, Smartphone, Server, Cog, BrainCircuit, Network, BarChart, ArrowRight, Globe, ArrowUpRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header({ initialLang = "en" }: { initialLang?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(initialLang.toUpperCase());
  const router = useRouter();

  const isId = language === "ID";

  const services = [
    { name: isId ? "Software Kustom" : "Custom Software", href: "/services/custom-software", icon: Server, desc: isId ? "Aplikasi enterprise yang disesuaikan." : "Bespoke enterprise applications." },
    { name: "Web Development", href: "/services/web-development", icon: Monitor, desc: isId ? "Platform web yang skalabel." : "Scalable web platforms." },
    { name: "Mobile Development", href: "/services/mobile-development", icon: Smartphone, desc: isId ? "Aplikasi native iOS dan Android." : "Native iOS and Android apps." },
    { name: isId ? "Sistem Bisnis" : "Business Systems", href: "/services/business-systems", icon: Cog, desc: isId ? "ERP dan perangkat lunak operasional." : "ERP and operational software." },
    { name: isId ? "Otomasi" : "Automation", href: "/services/automation", icon: Network, desc: isId ? "Otomatisasi proses repetitif." : "Automate repetitive processes." },
    { name: "AI Solutions", href: "/services/ai-solutions", icon: BrainCircuit, desc: isId ? "Integrasi AI yang praktis." : "Practical AI integration." },
    { name: "System Integration", href: "/services/system-integration", icon: Network, desc: isId ? "Menghubungkan sistem & API." : "Connect systems & APIs." },
  ];

  const solutions = [
    { name: isId ? "Operasi Bisnis" : "Business Operations", href: "/solutions/business-operations", icon: BarChart, desc: isId ? "Sederhanakan alur kerja harian." : "Streamline day-to-day workflows." },
    { name: "Inventory Management", href: "/solutions/inventory-management", icon: Server, desc: isId ? "Lacak stok secara real-time." : "Track stock in real-time." },
    { name: "Order Management", href: "/solutions/order-management", icon: Cog, desc: isId ? "Otomatisasi jalur pemenuhan pesanan." : "Automate fulfillment pipelines." },
    { name: "Field Service", href: "/solutions/field-service", icon: Network, desc: isId ? "Kelola tenaga kerja jarak jauh." : "Manage remote workforces." },
    { name: "Business Intelligence", href: "/solutions/business-intelligence", icon: BarChart, desc: isId ? "Dasbor analitik waktu-nyata." : "Real-time analytical dashboards." },
    { name: "Automation", href: "/solutions/automation", icon: Cog, desc: isId ? "Otomasi middleware." : "Middleware automation." },
    { name: "AI Solutions", href: "/solutions/ai", icon: BrainCircuit, desc: isId ? "RAG & klasifikasi pintar." : "RAG & smart classification." }
  ];

  const toggleLanguage = () => {
    const newLang = language === "EN" ? "ID" : "EN";
    setLanguage(newLang);
    document.cookie = `NEXT_LOCALE=${newLang.toLowerCase()}; path=/; max-age=31536000`;
    router.refresh(); 
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 h-16 shadow-sm py-0"
            : "bg-transparent h-24 py-4"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="container h-full mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center space-x-2 z-50 relative">
              <Image src="/images/logo.png" alt="NOVERA Logo" width={180} height={48} className="h-10 w-auto object-contain" priority />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-2 h-full">
              <Link href="/" className="px-4 text-[15px] font-medium text-foreground/90 hover:text-foreground transition-colors" onMouseEnter={() => setActiveMenu(null)}>
                {isId ? "Beranda" : "Home"}
              </Link>
              <Link href="/about" className="px-4 text-[15px] font-medium text-foreground/90 hover:text-foreground transition-colors" onMouseEnter={() => setActiveMenu(null)}>
                {isId ? "Tentang" : "About"}
              </Link>

              <div 
                className="relative h-full flex items-center px-4 cursor-pointer group"
                onMouseEnter={() => setActiveMenu("services")}
              >
                <span className={`text-[15px] font-medium flex items-center gap-1 transition-colors ${activeMenu === "services" ? "text-primary" : "text-foreground/90 group-hover:text-foreground"}`}>
                  {isId ? "Layanan" : "Services"} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === "services" ? "rotate-180" : ""}`} />
                </span>
              </div>

              <div 
                className="relative h-full flex items-center px-4 cursor-pointer group"
                onMouseEnter={() => setActiveMenu("solutions")}
              >
                <span className={`text-[15px] font-medium flex items-center gap-1 transition-colors ${activeMenu === "solutions" ? "text-primary" : "text-foreground/90 group-hover:text-foreground"}`}>
                  {isId ? "Solusi" : "Solutions"} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === "solutions" ? "rotate-180" : ""}`} />
                </span>
              </div>

              <Link href="/portfolio" className="px-4 text-[15px] font-medium text-foreground/90 hover:text-foreground transition-colors" onMouseEnter={() => setActiveMenu(null)}>
                {isId ? "Karya" : "Work"}
              </Link>
              <Link href="/insights" className="px-4 text-[15px] font-medium text-foreground/90 hover:text-foreground transition-colors" onMouseEnter={() => setActiveMenu(null)}>
                {isId ? "Wawasan" : "Insights"}
              </Link>
              <Link href="/process" className="px-4 text-[15px] font-medium text-foreground/90 hover:text-foreground transition-colors" onMouseEnter={() => setActiveMenu(null)}>
                {isId ? "Proses" : "Process"}
              </Link>
              <Link href="/careers" className="px-4 text-[15px] font-medium text-foreground/90 hover:text-foreground transition-colors" onMouseEnter={() => setActiveMenu(null)}>
                {isId ? "Karir" : "Careers"}
              </Link>
            </nav>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50">
            <div className="hidden lg:flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground/70 hover:text-foreground font-medium uppercase tracking-widest text-xs px-2"
                onClick={toggleLanguage}
              >
                <Globe className="w-4 h-4 mr-2" /> {language}
              </Button>
              <Link href="/admin/login">
                <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-foreground hover:bg-muted/50 px-3">
                  {isId ? "Masuk" : "Login"}
                </Button>
              </Link>
              <Link href="/start-a-project" className="ml-2">
                <Button className="h-10 px-6 font-medium shadow hover:scale-105 transition-transform group bg-primary text-primary-foreground">
                  {isId ? "Mulai Proyek" : "Start a Project"} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l-0 sm:border-l bg-background/95 backdrop-blur-3xl overflow-y-auto">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="p-6 pb-24 flex flex-col h-full min-h-screen">
                  <div className="flex items-center justify-between mb-8">
                    <Image src="/images/logo.png" alt="NOVERA Logo" width={150} height={40} className="h-8 w-auto object-contain" />
                    <SheetClose render={<Button variant="ghost" size="icon" className="w-10 h-10 [&>svg]:w-5 [&>svg]:h-5 rounded-full hover:bg-muted/50 transition-colors" />} />
                  </div>
                  
                  <Accordion className="w-full mb-6">
                    <AccordionItem value="services" className="border-b-border/30">
                      <AccordionTrigger className="text-base font-semibold hover:no-underline py-3">{isId ? "Layanan" : "Services"}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 pl-4 border-l border-border/50 py-2">
                          <Link href="/services" onClick={closeMobileMenu} className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors block py-2 mb-1">
                            {isId ? "Overview Layanan" : "Services Overview"}
                          </Link>
                          {services.map((item) => (
                            <Link key={item.name} href={item.href} onClick={closeMobileMenu} className="text-[15px] text-muted-foreground hover:text-primary transition-colors block py-1.5">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="solutions" className="border-b-border/30">
                      <AccordionTrigger className="text-base font-semibold hover:no-underline py-3">{isId ? "Solusi" : "Solutions"}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 pl-4 border-l border-border/50 py-2">
                          <Link href="/solutions" onClick={closeMobileMenu} className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors block py-2 mb-1">
                            {isId ? "Overview Solusi" : "Solutions Overview"}
                          </Link>
                          {solutions.map((item) => (
                            <Link key={item.name} href={item.href} onClick={closeMobileMenu} className="text-[15px] text-muted-foreground hover:text-primary transition-colors block py-1.5">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex flex-col gap-4 mb-10">
                    <Link href="/" onClick={closeMobileMenu} className="text-base font-semibold hover:text-primary transition-colors">{isId ? "Beranda" : "Home"}</Link>
                    <Link href="/about" onClick={closeMobileMenu} className="text-base font-semibold hover:text-primary transition-colors">{isId ? "Tentang" : "About"}</Link>
                    <Link href="/portfolio" onClick={closeMobileMenu} className="text-base font-semibold hover:text-primary transition-colors">{isId ? "Karya" : "Work"}</Link>
                    <Link href="/insights" onClick={closeMobileMenu} className="text-base font-semibold hover:text-primary transition-colors">{isId ? "Wawasan" : "Insights"}</Link>
                    <Link href="/process" onClick={closeMobileMenu} className="text-base font-semibold hover:text-primary transition-colors">{isId ? "Proses" : "Process"}</Link>
                    <Link href="/careers" onClick={closeMobileMenu} className="text-base font-semibold hover:text-primary transition-colors">{isId ? "Karir" : "Careers"}</Link>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 h-11 text-xs uppercase tracking-widest font-semibold"
                        onClick={toggleLanguage}
                      >
                        <Globe className="w-4 h-4 mr-2" /> {language}
                      </Button>
                      <Link href="/admin/login" onClick={closeMobileMenu} className="flex-1">
                        <Button variant="outline" className="w-full h-11 text-xs uppercase tracking-widest font-semibold">
                          {isId ? "Masuk" : "Login"}
                        </Button>
                      </Link>
                    </div>
                    <Link href="/start-a-project" onClick={closeMobileMenu}>
                      <Button className="w-full h-11 text-[15px] shadow-lg group bg-primary text-primary-foreground">
                        {isId ? "Mulai Proyek" : "Start a Project"} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="https://wa.me/6281222616472?text=Hello%20NOVERA" onClick={closeMobileMenu}>
                      <Button variant="outline" className="w-full h-11 text-[15px] group border-primary/20 hover:bg-primary/5 hover:text-primary">
                        {isId ? "Hubungi via WhatsApp" : "Contact via WhatsApp"} <ArrowUpRight className="w-4 h-4 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* DESKTOP MEGA MENU DROPDOWNS */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-2xl overflow-hidden"
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="container mx-auto px-4 md:px-8 py-10">
                {activeMenu === "services" && (
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-3 pr-8 border-r border-border/40">
                      <h3 className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">{isId ? "Layanan" : "Services"}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {isId ? "Kami merekayasa sistem bisnis kompleks yang disesuaikan secara presisi untuk kebutuhan operasional Anda." : "We engineer complex business systems tailored exactly to your operational needs."}
                      </p>
                      <Link href="/services" onClick={() => setActiveMenu(null)} className="inline-flex items-center text-sm font-medium hover:text-primary group transition-colors">
                        {isId ? "Overview Layanan" : "Services Overview"} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    <div className="col-span-9 grid grid-cols-2 md:grid-cols-3 gap-6">
                      {services.map((item) => (
                        <Link key={item.name} href={item.href} onClick={() => setActiveMenu(null)} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-heading font-medium text-[15px] text-foreground group-hover:text-primary transition-colors mb-1 flex items-center">
                              {item.name}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {activeMenu === "solutions" && (
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-3 pr-8 border-r border-border/40">
                      <h3 className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">{isId ? "Solusi" : "Solutions"}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {isId ? "Platform pra-arsitektur yang disesuaikan untuk menyelesaikan hambatan operasional perusahaan." : "Pre-architected platforms tailored for specific enterprise operational bottlenecks."}
                      </p>
                      <Link href="/solutions" onClick={() => setActiveMenu(null)} className="inline-flex items-center text-sm font-medium hover:text-primary group transition-colors">
                        {isId ? "Overview Solusi" : "Solutions Overview"} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    <div className="col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {solutions.map((item) => (
                        <Link key={item.name} href={item.href} onClick={() => setActiveMenu(null)} className="group flex flex-col gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-heading font-medium text-[14px] text-foreground group-hover:text-primary transition-colors mb-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* GLOBAL FLOATING WHATSAPP CTA */}
      <Link href="https://wa.me/6281222616472?text=Hello%20NOVERA" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group">
        <div className="flex items-center gap-0">
          <div className="bg-background border border-border/50 shadow-lg px-4 py-2 rounded-l-full translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none hidden md:block">
            <span className="text-sm font-medium whitespace-nowrap">{isId ? "Ngobrol via WhatsApp" : "Chat on WhatsApp"}</span>
          </div>
          <div className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 z-10">
            <MessageCircle className="w-7 h-7" />
          </div>
        </div>
      </Link>
    </>
  );
}
