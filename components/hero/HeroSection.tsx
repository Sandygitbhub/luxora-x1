"use client";

import { useRef, useState } from "react";
import { gsap } from "@/animations/gsap-config";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import Modal from "@/components/ui/Modal";

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      
      tl.from(".hero-title", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.2,
      })
      .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      }, "-=1")
      .from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8")
      .from(".scroll-indicator", {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      }, "-=0.4");

      // Bouncing scroll indicator
      gsap.to(".scroll-icon", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    },
    { scope: container }
  );

  const handleScrollToCustomize = () => {
    gsap.to(window, { duration: 1.5, scrollTo: "#customize", ease: "power3.inOut" });
  };

  return (
    <>
      <section 
        ref={container} 
        className="relative w-full h-screen flex flex-col items-center justify-center z-10 pt-20"
      >
        <div className="text-center px-4 max-w-5xl mx-auto">
          <h1 className="overflow-hidden mb-4">
            <span className="hero-title block text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter text-white leading-tight">
              Silence the world. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600">Hear every detail.</span>
            </span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            Precision-crafted audio intelligence. Experience the absolute pinnacle of acoustic engineering with spatial 360° audio and neural noise cancellation.
          </p>
          
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleScrollToCustomize}
              className="px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] font-semibold rounded-full hover:scale-105 transition-transform duration-300 focus:ring-4 focus:ring-white/20 outline-none"
            >
              Order LUXORA X1
            </button>
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="px-8 py-4 bg-transparent text-white text-sm uppercase tracking-[0.15em] font-semibold rounded-full hover:text-zinc-300 transition-colors focus:ring-4 focus:ring-white/20 outline-none relative group"
            >
              Watch the Film
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
          </div>
        </div>

        <div className="scroll-indicator absolute bottom-12 flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[10px] uppercase tracking-[0.3em] mb-3 text-zinc-500 font-medium">Explore</span>
          <ArrowDown className="scroll-icon w-4 h-4 text-zinc-400" />
        </div>
      </section>

      <Modal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)}>
        <div className="relative w-full aspect-video bg-zinc-950 flex items-center justify-center border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          {/* Placeholder for real video player */}
          <div className="text-center relative z-10">
            <h3 className="text-3xl font-light text-white mb-3 tracking-wide">LUXORA X1</h3>
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs font-semibold">Cinematic Experience</p>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-950 to-zinc-950 pointer-events-none"></div>
        </div>
      </Modal>
    </>
  );
}
