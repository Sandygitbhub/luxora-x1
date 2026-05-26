"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

export default function ProceduralHeadphone() {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current) return;
    
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    let scrollY = 0;
    let scrollX = 0;
    let scale = 1;

    if (scroll) {
      const scrollOffset = scroll.offset;
      scrollY = scrollOffset * Math.PI * 4; // Multiple rotations as you scroll
      scrollX = 0.2 + scrollOffset * 1.5;
      // Dynamic scale
      scale = 1 + Math.sin(scrollOffset * Math.PI) * 0.5;
    }

    targetRotation.current.y = scrollY + mouseX * 0.8;
    targetRotation.current.x = scrollX - mouseY * 0.4;

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation.current.y, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotation.current.x, 0.05);

    group.current.scale.set(scale, scale, scale);
  });

  // Premium Materials matching the primary configurator style (e.g. Midnight Blue / Dark aesthetic)
  const primaryMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#0a0a0c",
    roughness: 0.2,
    metalness: 0.8,
    envMapIntensity: 2,
  }), []);

  const cushionMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#050505",
    roughness: 0.95,
    metalness: 0.05,
  }), []);

  const metalAccentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#e5e5e5",
    roughness: 0.15,
    metalness: 0.95,
    envMapIntensity: 2.5,
  }), []);

  const darkMetalMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#181818", 
    roughness: 0.4, 
    metalness: 0.7 
  }), []);

  return (
    <group ref={group} dispose={null} scale={[1.8, 1.8, 1.8]} position={[0, -0.2, 0]}>
      
      {/* --- Premium Headband --- */}
      <group position={[0, 1.4, 0]}>
        {/* Outer metallic band */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.2, 0.12, 32, 100, Math.PI]} />
          <primitive object={primaryMaterial} attach="material" />
        </mesh>
        {/* Inner plush cushion */}
        <mesh position={[0, -0.05, 0]}>
          <torusGeometry args={[1.18, 0.08, 32, 100, Math.PI]} />
          <primitive object={cushionMaterial} attach="material" />
        </mesh>
      </group>

      {/* --- Left Earcup Assembly --- */}
      <group position={[-1.2, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        
        {/* Adjustment Slider / Hinge */}
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 32]} />
          <primitive object={metalAccentMaterial} attach="material" />
        </mesh>
        
        {/* Yoke Bracket */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.3, 0.1, 1.4]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -0.2, 0.65]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -0.2, -0.65]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>

        {/* Earcup Outer Shell */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.7, 0.65, 0.4, 64]} />
          <primitive object={primaryMaterial} attach="material" />
        </mesh>
        
        {/* Decorative Ring */}
        <mesh position={[0, -0.41, 0]}>
          <torusGeometry args={[0.65, 0.02, 16, 64]} />
          <primitive object={metalAccentMaterial} attach="material" />
        </mesh>

        {/* Earcup Inner Cushion (Memory Foam) */}
        <mesh position={[0, -0.5, 0]} scale={[1, 0.5, 1]}>
          <torusGeometry args={[0.55, 0.25, 32, 64]} />
          <primitive object={cushionMaterial} attach="material" />
        </mesh>
        
        {/* Inside Speaker Grill */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
          <meshStandardMaterial color="#020202" roughness={0.8} metalness={0.5} wireframe={true} />
        </mesh>
      </group>

      {/* --- Right Earcup Assembly --- */}
      <group position={[1.2, 0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
        
        {/* Adjustment Slider / Hinge */}
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 32]} />
          <primitive object={metalAccentMaterial} attach="material" />
        </mesh>
        
        {/* Yoke Bracket */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.3, 0.1, 1.4]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -0.2, 0.65]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -0.2, -0.65]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>

        {/* Earcup Outer Shell */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.7, 0.65, 0.4, 64]} />
          <primitive object={primaryMaterial} attach="material" />
        </mesh>
        
        {/* Decorative Ring */}
        <mesh position={[0, -0.41, 0]}>
          <torusGeometry args={[0.65, 0.02, 16, 64]} />
          <primitive object={metalAccentMaterial} attach="material" />
        </mesh>

        {/* Earcup Inner Cushion (Memory Foam) */}
        <mesh position={[0, -0.5, 0]} scale={[1, 0.5, 1]}>
          <torusGeometry args={[0.55, 0.25, 32, 64]} />
          <primitive object={cushionMaterial} attach="material" />
        </mesh>
        
        {/* Inside Speaker Grill */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
          <meshStandardMaterial color="#020202" roughness={0.8} metalness={0.5} wireframe={true} />
        </mesh>
      </group>

    </group>
  );
}
