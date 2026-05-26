"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, ContactShadows, Float } from "@react-three/drei";
import ProceduralHeadphone from "./ProceduralHeadphone";
import Particles from "./Particles";
import { Suspense } from "react";

export default function ThreeScene() {
  return (
    <div className="w-full h-[100vh] fixed top-0 left-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          {/* Cinematic Lighting Setup */}
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4444ff" />
          <pointLight position={[10, -10, -10]} intensity={0.5} color="#ff4444" />
          
          <Particles count={2000} />

          <ScrollControls pages={5} damping={0.25}>
            <Float
              speed={2} // Animation speed, defaults to 1
              rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
              floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
              <ProceduralHeadphone />
            </Float>
          </ScrollControls>
          
          <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
        </Suspense>
      </Canvas>
    </div>
  );
}
