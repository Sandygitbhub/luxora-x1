import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import FeaturesSection from "@/components/features/FeaturesSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ConfiguratorSection from "@/components/configurator/ConfiguratorSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import Footer from "@/components/layout/Footer";
import ThreeScene from "@/components/three-scene/ThreeScene";

export default function Home() {
  return (
    <main id="top" className="relative bg-black min-h-screen">
      <Navbar />
      
      {/* 3D Background - Fixed position managed within ThreeScene */}
      <ThreeScene />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col pointer-events-none">
        {/* Enable pointer events on sections that require interaction */}
        <div className="pointer-events-auto">
          <HeroSection />
          <FeaturesSection />
          <ExperienceSection />
          <ConfiguratorSection />
          <TestimonialsSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
