"use client";

import { useRef } from "react";
import { gsap } from "@/animations/gsap-config";
import { useGSAP } from "@gsap/react";

interface ScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  triggerOffset?: string;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    y = 50,
    opacity = 0,
    duration = 1,
    stagger = 0.2,
    delay = 0,
    triggerOffset = "top 80%",
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.children;

      gsap.fromTo(
        elements,
        {
          y,
          opacity,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerOffset,
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return containerRef;
}
