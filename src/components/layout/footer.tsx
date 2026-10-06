import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { MessageSquare, Mail, ArrowRight } from "lucide-react";

export function Footer({ lang = "en" }: { lang?: string }) {
  const isId = lang === "id";

  const footerSections = [
    {
      title: isId ? "Perusahaan" : "Company",
      links: [
        { name: isId ? "Tentang NOVERA" : "About NOVERA", href: "/about" },
        { name: isId ? "Proses Kami" : "Our Process", href: "/process" },
        { name: isId ? "Karir" : "Careers", href: "/careers" },
        { name: isId ? "Kontak" : "Contact", href: "/contact" },
      ]
    },
    {
      title: isId ? "Layanan" : "Services",
      links: [
        { name: isId ? "Software Kustom" : "Custom Software", href: "/services/custom-software" },
        { name: "Web Development", href: "/services/web-development" },
        { name: "Mobile Development", href: "/services/mobile-development" },
        { name: isId ? "Sistem Bisnis" : "Business Systems", href: "/services/business-systems" },
        { name: isId ? "Otomasi" : "Automation", href: "/services/automation" },
        { name: "AI Solutions", href: "/services/ai-solutions" },
        { name: "System Integration", href: "/services/system-integration" },
      ]
    },
    {
      title: isId ? "Solusi" : "Solutions",
      links: [
        { name: isId ? "Operasi Bisnis" : "Business Operations", href: "/solutions/business-operations" },
        { name: "Inventory Management", href: "/solutions/inventory-management" },
        { name: "Order Management", href: "/solutions/order-management" },
        { name: "Field Service", href: "/solutions/field-service" },
        { name: "Business Intelligence", href: "/solutions/business-intelligence" },
        { name: isId ? "Otomasi Alur Kerja" : "Workflow Automation", href: "/solutions/automation" },
        { name: "AI Integration", href: "/solutions/ai" },
      ]
    },
    {
      title: isId ? "Karya & Wawasan" : "Work & Insights",
      links: [
        { name: "Portfolio", href: "/portfolio" },
        { name: isId ? "Studi Kasus" : "Case Studies", href: "/portfolio" },
        { name: isId ? "Wawasan" : "Insights", href: "/insights" },
        { name: isId ? "Artikel" : "Articles", href: "/insights" },
        { name: isId ? "Kategori" : "Categories", href: "/insights/category" },
      ]
    }
  ];

  return (
    <footer className="bg-background border-t border-border/40 relative pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col pr-4">
            <Link href="/" className="inline-block mb-6">
              <Image src="/images/logo.png" alt="NOVERA Logo" width={200} height={56} className="h-12 w-auto object-contain" />
            </Link>
            <h4 className="text-foreground font-medium mb-3">Software Development & Technology Solutions</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
              {isId ? "Teknologi yang membawa bisnis Anda maju. Kami membangun sistem yang mengotomatisasi, menskalakan, dan mengoptimalkan operasi enterprise." : "Technology that moves your business forward. We build systems that automate, scale, and optimize enterprise operations."}
            </p>
            
            <div className="flex items-center gap-3">
              <Link href="https://wa.me/6281222616472?text=Hello%20NOVERA,%20I%20would%20like%20to%20discuss%20a%20software%20project." target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary/50 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="mailto:hello@novera.com">
                <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary/50 transition-colors">
                  <Mail className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="https://instagram.com/noveratech.id" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary/50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </Button>
              </Link>
              <Link href="https://tiktok.com/@noveratech.id" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary/50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                </Button>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full hover:text-primary hover:border-primary/50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Grids */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 col-span-2 lg:col-span-8 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-heading font-semibold text-foreground mb-6 uppercase tracking-wider text-xs">{section.title}</h3>
                <ul className="space-y-3.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Accordion Navigation */}
          <div className="md:hidden lg:col-span-8">
            <Accordion className="w-full">
              {footerSections.map((section) => (
                <AccordionItem key={section.title} value={section.title} className="border-border/40">
                  <AccordionTrigger className="font-heading text-lg hover:no-underline py-4 uppercase tracking-wider text-sm">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-3 py-2 pl-2">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link href={link.href} className="text-base text-muted-foreground hover:text-primary block py-1.5">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} NOVERA Technologies. {isId ? "Hak cipta dilindungi." : "All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {isId ? "Kebijakan Privasi" : "Privacy Policy"}
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {isId ? "Syarat dan Ketentuan" : "Terms of Service"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
