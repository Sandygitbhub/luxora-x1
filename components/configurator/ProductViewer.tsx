"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import HeadphoneModel from "./HeadphoneModel";
import { HeadphoneColor } from "@/hooks/useColorCustomizer";
import { Suspense } from "react";
import { Maximize, Minimize, Rotate3D, PauseCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductViewerProps {
  activeColor: HeadphoneColor;
}

export default function ProductViewer({ activeColor }: ProductViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  return (
    <div 
      className={cn(
        "cursor-grab active:cursor-grabbing relative transition-all duration-500",
        isFullscreen 
          ? "fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center" 
          : "w-full h-full min-h-[500px] lg:min-h-[700px]"
      )}
    >
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors border border-white/10"
          aria-label={autoRotate ? "Pause rotation" : "Start rotation"}
          title={autoRotate ? "Pause rotation" : "Start rotation"}
        >
          {autoRotate ? <PauseCircle className="w-5 h-5" /> : <Rotate3D className="w-5 h-5" />}
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors border border-white/10"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>
      </div>

      <Canvas shadows camera={{ position: [0, 0, isFullscreen ? 6 : 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#444" />
          
          <HeadphoneModel activeColor={activeColor} />
          
          <Environment preset="city" />
          
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={2} 
            far={4} 
          />
          
          <OrbitControls 
            enablePan={false}
            enableZoom={isFullscreen}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            makeDefault
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
