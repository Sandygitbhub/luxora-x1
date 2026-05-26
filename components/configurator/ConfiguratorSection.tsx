"use client";

import { useRef } from "react";
import { useColorCustomizer } from "@/hooks/useColorCustomizer";
import ConfiguratorUI from "./ConfiguratorUI";
import ProductViewer from "./ProductViewer";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap-config";

export default function ConfiguratorSection() {
  const { activeColor, handleColorChange, availableColors } = useColorCustomizer();
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Reveal animation when scrolling into view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(
      ".configurator-container",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      ".configurator-text",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(
      ".configurator-options",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      ".configurator-price",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: sectionRef });

  return (
    <section id="customize" ref={sectionRef} className="relative w-full min-h-screen py-24 bg-black overflow-hidden flex items-center z-20 pointer-events-auto">
      {/* Background glow behind 3d scene */}
      <div 
        className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: activeColor.hex }}
      />
      
      <div className="container mx-auto px-4 md:px-8 xl:px-16">
        <div className="configurator-container flex flex-col lg:flex-row items-center gap-12 lg:gap-8 rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md p-4 lg:p-8">
          
          {/* 3D Viewer Area */}
          <div className="w-full lg:w-3/5 h-[50vh] lg:h-[80vh] rounded-3xl overflow-hidden relative">
            <ProductViewer activeColor={activeColor} />
          </div>

          {/* Configuration UI Panel */}
          <div className="w-full lg:w-2/5 h-full lg:h-[80vh]">
            <ConfiguratorUI 
              activeColor={activeColor}
              handleColorChange={handleColorChange}
              availableColors={availableColors}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
