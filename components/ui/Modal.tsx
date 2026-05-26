"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap } from "@/animations/gsap-config";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: "flex", ease: "power2.out" });
      gsap.fromTo(contentRef.current, { scale: 0.95, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, delay: 0.1, ease: "back.out(1.7)" });
    } else {
      document.body.style.overflow = "";
      gsap.to(contentRef.current, { scale: 0.95, opacity: 0, y: 20, duration: 0.2, ease: "power2.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: "none", ease: "power2.in", delay: 0.1 });
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div 
        ref={contentRef}
        className="relative w-full max-w-5xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl opacity-0"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
