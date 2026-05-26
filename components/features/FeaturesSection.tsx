"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { 
  AudioWaveform, 
  Ear, 
  VolumeX, 
  BatteryFull, 
  Fingerprint, 
  Mic,
  ChevronDown
} from "lucide-react";

const features = [
  {
    title: "Neural Acoustics",
    description: "Adaptive real-time tuning that perfectly maps to the unique geometry of your ear.",
    details: "Powered by a dedicated bionic engine, the X1 analyzes ambient sound signatures 50,000 times per second, ensuring absolute fidelity and lossless playback in any environment.",
    icon: AudioWaveform,
  },
  {
    title: "Spatial 360° Sphere",
    description: "Immersive, multidimensional sound that places you at the center of the recording.",
    details: "Advanced dynamic head tracking algorithms create a breathtaking theater-grade soundstage. Every instrument, every breath, precisely positioned in the space around you.",
    icon: Ear,
  },
  {
    title: "Absolute Silence",
    description: "Our most advanced Active Noise Cancellation architecture to date.",
    details: "Six outward-facing acoustic sensors detect and completely neutralize external noise before it reaches your ear. A seamless Transparency Mode lets the world back in with a tap.",
    icon: VolumeX,
  },
  {
    title: "Endless Autonomy",
    description: "40 hours of uninterrupted high-fidelity listening on a single charge.",
    details: "Intelligent power management paired with a high-density battery cell. A mere 10-minute charge delivers 5 hours of playback. The included Smart Case preserves power automatically.",
    icon: BatteryFull,
  },
  {
    title: "Intuitive Touch",
    description: "Seamlessly orchestrate your audio with absolute precision.",
    details: "Invisible capacitive sensors embedded within the aerospace-grade aluminum ear cups. Swipe to adjust volume, tap to skip, or hold to summon your voice assistant.",
    icon: Fingerprint,
  },
  {
    title: "Crystal Clarity",
    description: "Studio-grade vocal isolation for pristine communication.",
    details: "Dual beamforming microphones actively filter out wind and background interference, isolating your voice so you are heard with perfect clarity, no matter where you are.",
    icon: Mic,
  },
];

export default function FeaturesSection() {
  const containerRef = useScrollReveal({ stagger: 0.1, y: 40 });
  const titleRef = useScrollReveal({ y: 30, triggerOffset: "top 85%" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="features" className="relative w-full py-32 z-10 bg-black backdrop-blur-sm pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-24">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 mb-6">
            Engineering
          </h2>
          <h3 className="text-5xl md:text-6xl font-medium text-white mb-6 tracking-tight">
            Sound, perfected.
          </h3>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Every millimeter of the LUXORA X1 has been meticulously crafted to deliver an uncompromising auditory journey.
          </p>
        </div>

        <div 
          ref={containerRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-10 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:bg-zinc-800/50 hover:border-white/10 transition-all duration-500 backdrop-blur-xl flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 text-zinc-100 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                <feature.icon className="w-7 h-7 stroke-[1.5]" />
              </div>
              <h4 className="text-2xl font-medium text-white mb-3 tracking-wide">
                {feature.title}
              </h4>
              <p className="text-zinc-400 leading-relaxed font-light mb-8">
                {feature.description}
              </p>
              
              <div className="mt-auto">
                <button
                  onClick={() => toggleExpand(index)}
                  className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white uppercase tracking-[0.2em] font-semibold transition-colors"
                  aria-expanded={expandedIndex === index}
                >
                  {expandedIndex === index ? "Show Less" : "Discover More"}
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-500", 
                    expandedIndex === index ? "rotate-180" : ""
                  )} />
                </button>
                
                <div 
                  className={cn(
                    "grid transition-all duration-500 ease-in-out",
                    expandedIndex === index ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-zinc-400 font-light leading-relaxed border-t border-white/10 pt-6">
                      {feature.details}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
