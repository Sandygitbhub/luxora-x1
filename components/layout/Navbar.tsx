"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "@/animations/gsap-config";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Experience", href: "#experience" },
  { name: "Customize", href: "#customize" },
  { name: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, { duration: 1, scrollTo: href, ease: "power3.inOut" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => handleScrollTo(e, "#top")}
          className="text-white text-xl font-bold tracking-[0.2em] uppercase z-50 relative"
        >
          LUXORA
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm text-gray-300 hover:text-white uppercase tracking-widest transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#customize"
            onClick={(e) => handleScrollTo(e, "#customize")}
            className="text-sm text-black bg-white px-6 py-2 rounded-full font-semibold uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            Buy Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-50 relative p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div 
        className={cn(
          "fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-2xl text-gray-300 hover:text-white uppercase tracking-widest transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#customize"
            onClick={(e) => handleScrollTo(e, "#customize")}
            className="text-xl text-black bg-white px-8 py-3 mt-4 rounded-full font-semibold uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            Buy Now
          </a>
        </nav>
      </div>
    </header>
  );
}
