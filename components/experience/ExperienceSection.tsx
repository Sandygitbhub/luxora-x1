"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap-config";
import { useGSAP } from "@gsap/react";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !horizontalWrapperRef.current) return;
      
      const sections = gsap.utils.toArray(".story-panel");
      
      // Horizontal scrolling timeline
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          // We use the wrapper's offsetWidth to determine the scroll duration
          end: () => "+=" + horizontalWrapperRef.current?.offsetWidth,
        }
      });

      // Animating elements inside the panels
      sections.forEach((panel: any) => {
        const textElements = panel.querySelectorAll(".anim-text");
        const imageElement = panel.querySelector(".anim-img");

        if (textElements.length > 0) {
          gsap.fromTo(textElements, 
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.2,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left center",
                toggleActions: "play none none reverse",
              }
            }
          );
        }

        if (imageElement) {
           gsap.fromTo(imageElement, 
            { scale: 0.8, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left center",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      });
      
    },
    { scope: sectionRef }
  );

  return (
    <section id="experience" ref={sectionRef} className="relative w-full bg-black z-10 overflow-hidden pointer-events-auto">
      {/* Container for horizontal scrolling */}
      <div 
        ref={horizontalWrapperRef} 
        className="flex w-[300vw] h-screen"
      >
        {/* Panel 1 */}
        <div className="story-panel w-screen h-screen flex flex-col items-center justify-center relative px-8">
           <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black opacity-80" />
           <div className="z-10 text-center max-w-4xl">
              <p className="anim-text text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 mb-6">
                The Design
              </p>
              <h2 className="anim-text text-5xl md:text-8xl font-light text-white mb-8 tracking-tighter leading-tight">
                Crafted from <br />
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                  aerospace-grade aluminum.
                </span>
              </h2>
              <p className="anim-text text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                We stripped away the unnecessary to leave only what matters. A seamless blend of form and function that feels as invisible as it sounds.
              </p>
           </div>
        </div>

        {/* Panel 2 */}
        <div className="story-panel w-screen h-screen flex flex-col md:flex-row items-center justify-center relative px-8 md:px-24">
           <div className="w-full md:w-1/2 flex flex-col justify-center z-10 pr-0 md:pr-12">
              <h2 className="anim-text text-4xl md:text-6xl font-semibold text-white mb-6">
                Acoustic Architecture
              </h2>
              <p className="anim-text text-lg text-gray-400 font-light leading-relaxed mb-8">
                Every millimeter of the interior chamber has been precisely calculated to reduce resonance and eliminate distortion. 
                The result is a soundstage so vast, you'll feel like you're in the room with the artist.
              </p>
              <ul className="anim-text flex flex-col gap-4 text-gray-300">
                 <li className="flex items-center gap-4"><span className="w-8 h-[1px] bg-white/30 block"></span> 40mm Beryllium Drivers</li>
                 <li className="flex items-center gap-4"><span className="w-8 h-[1px] bg-white/30 block"></span> Zero-distortion acoustic chamber</li>
                 <li className="flex items-center gap-4"><span className="w-8 h-[1px] bg-white/30 block"></span> Active pressure relief</li>
              </ul>
           </div>
           <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative mt-12 md:mt-0 anim-img rounded-3xl overflow-hidden border border-white/10 glassmorphism">
              {/* Cinematic placeholder */}
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-black flex items-center justify-center">
                 <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center">
                       <div className="w-16 h-16 rounded-full bg-white/10 blur-xl"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Panel 3 */}
        <div className="story-panel w-screen h-screen flex flex-col items-center justify-center relative px-8">
           <div className="absolute inset-0 bg-black flex items-center justify-center">
             <div className="w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-40 blur-2xl"></div>
           </div>
           
           <div className="z-10 text-center max-w-4xl">
              <p className="anim-text text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 mb-6">
                All-Day Comfort
              </p>
              <h2 className="anim-text text-5xl md:text-7xl font-light text-white mb-8">
                Memory foam that <br />
                <span className="italic font-serif text-gray-300">remembers you.</span>
              </h2>
              <p className="anim-text text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                Wrapped in premium breathable synthetic leather, the ear cushions dynamically adapt to the geometry of your head, forming an acoustic seal that blocks out the world.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}
