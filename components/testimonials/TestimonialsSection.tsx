"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "An acoustic revelation. The neural noise cancellation creates a vacuum of absolute silence, allowing the pristine soundstage to breathe.",
    author: "Elena R.",
    role: "Chief Acoustic Engineer",
  },
  {
    quote: "Uncompromising fidelity wrapped in a breathtakingly minimal silhouette. The X1 redefines the standard for reference-grade wireless audio.",
    author: "Marcus T.",
    role: "Grammy-Winning Producer",
  },
  {
    quote: "A masterclass in industrial design and acoustic engineering. They feel virtually invisible, yet sound larger than life.",
    author: "Sarah W.",
    role: "Technology Critic",
  },
];

export default function TestimonialsSection() {
  const containerRef = useScrollReveal({ stagger: 0.2, y: 50 });
  const titleRef = useScrollReveal({ y: 30 });

  return (
    <section id="testimonials" className="relative w-full py-40 z-10 bg-black pointer-events-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-24">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 mb-6">
            The Verdict
          </h2>
          <h3 className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight">
            Acknowledged by purists.
          </h3>
        </div>

        <div 
          ref={containerRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {testimonials.map((t, index) => (
            <div 
              key={index}
              className="p-10 rounded-3xl bg-zinc-900/30 border border-white/5 flex flex-col justify-between hover:bg-zinc-800/30 hover:border-white/10 transition-colors duration-500"
            >
              <Quote className="w-8 h-8 text-zinc-700 mb-8" />
              <p className="text-xl text-zinc-300 font-light leading-relaxed mb-10 flex-grow">
                "{t.quote}"
              </p>
              <div>
                <p className="text-white font-medium tracking-wide">{t.author}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-500 mt-2">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
