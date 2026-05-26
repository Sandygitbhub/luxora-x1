"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HeadphoneColor } from "@/hooks/useColorCustomizer";

interface HeadphoneModelProps {
  activeColor: HeadphoneColor;
}

export default function HeadphoneModel({
  activeColor,
}: HeadphoneModelProps) {
  const group = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Smooth color transition logic
  const targetColor = useMemo(
    () => new THREE.Color(activeColor.hex),
    [activeColor.hex]
  );

  useFrame((state, delta) => {
    if (!group.current) return;

    // Floating animation
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.5) * 0.08;

    // Smooth material transitions
    materialsRef.current.forEach((mat) => {
      mat.color.lerp(targetColor, delta * 4);

      mat.roughness = THREE.MathUtils.lerp(
        mat.roughness,
        activeColor.materialRoughness,
        delta * 4
      );

      mat.metalness = THREE.MathUtils.lerp(
        mat.metalness,
        activeColor.materialMetalness,
        delta * 4
      );
    });
  });

  const addMaterialRef = (
    mat: THREE.MeshStandardMaterial | null
  ) => {
    if (mat && !materialsRef.current.includes(mat)) {
      materialsRef.current.push(mat);
    }
  };

  // Materials
  const cushionMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#111111",
        roughness: 0.9,
        metalness: 0.1,
      }),
    []
  );

  const metalAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e5e5e5",
        roughness: 0.2,
        metalness: 0.9,
        envMapIntensity: 2,
      }),
    []
  );

  const darkMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#222222",
        roughness: 0.4,
        metalness: 0.7,
      }),
    []
  );

  return (
    <group
      ref={group}
      dispose={null}
      scale={1.8}
      position={[0, -0.5, 0]}
    >
      {/* Headband */}
      <group position={[0, 1.4, 0]}>
        {/* Outer Band */}
        <mesh>
          <torusGeometry
            args={[1.2, 0.12, 32, 100, Math.PI]}
          />

          <meshStandardMaterial
            ref={addMaterialRef}
            color={activeColor.hex}
            roughness={activeColor.materialRoughness}
            metalness={activeColor.materialMetalness}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Inner Cushion */}
        <mesh position={[0, -0.05, 0]}>
          <torusGeometry
            args={[1.18, 0.08, 32, 100, Math.PI]}
          />

          <meshStandardMaterial
            color="#1a1a1a"
            roughness={1}
            metalness={0}
          />
        </mesh>
      </group>

      {/* LEFT EARCUP */}
      <group
        position={[-1.2, 0.2, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        {/* Slider */}
        <mesh
          position={[0, 0.35, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.08, 0.08, 0.8, 32]} />
          <primitive
            object={metalAccentMaterial}
            attach="material"
          />
        </mesh>

        {/* Bracket */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.3, 0.1, 1.4]} />

          <primitive
            object={darkMetalMaterial}
            attach="material"
          />
        </mesh>

        {/* Side Hinges */}
        <mesh
          position={[0, -0.2, 0.65]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />

          <primitive
            object={darkMetalMaterial}
            attach="material"
          />
        </mesh>

        <mesh
          position={[0, -0.2, -0.65]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />

          <primitive
            object={darkMetalMaterial}
            attach="material"
          />
        </mesh>

        {/* Outer Shell */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry
            args={[0.7, 0.65, 0.4, 64]}
          />

          <meshStandardMaterial
            ref={addMaterialRef}
            color={activeColor.hex}
            roughness={activeColor.materialRoughness}
            metalness={activeColor.materialMetalness}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Decorative Ring */}
        <mesh position={[0, -0.41, 0]}>
          <torusGeometry args={[0.65, 0.02, 16, 64]} />

          <primitive
            object={metalAccentMaterial}
            attach="material"
          />
        </mesh>

        {/* Cushion */}
        <mesh
          position={[0, -0.5, 0]}
          scale={[1, 0.5, 1]}
        >
          <torusGeometry
            args={[0.55, 0.25, 32, 64]}
          />

          <primitive
            object={cushionMaterial}
            attach="material"
          />
        </mesh>
      </group>

      {/* RIGHT EARCUP */}
      <group
        position={[1.2, 0.2, 0]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        {/* Slider */}
        <mesh
          position={[0, 0.35, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.08, 0.08, 0.8, 32]} />

          <primitive
            object={metalAccentMaterial}
            attach="material"
          />
        </mesh>

        {/* Bracket */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.3, 0.1, 1.4]} />

          <primitive
            object={darkMetalMaterial}
            attach="material"
          />
        </mesh>

        {/* Side Hinges */}
        <mesh
          position={[0, -0.2, 0.65]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />

          <primitive
            object={darkMetalMaterial}
            attach="material"
          />
        </mesh>

        <mesh
          position={[0, -0.2, -0.65]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />

          <primitive
            object={darkMetalMaterial}
            attach="material"
          />
        </mesh>

        {/* Outer Shell */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry
            args={[0.7, 0.65, 0.4, 64]}
          />

          <meshStandardMaterial
            ref={addMaterialRef}
            color={activeColor.hex}
            roughness={activeColor.materialRoughness}
            metalness={activeColor.materialMetalness}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Decorative Ring */}
        <mesh position={[0, -0.41, 0]}>
          <torusGeometry args={[0.65, 0.02, 16, 64]} />

          <primitive
            object={metalAccentMaterial}
            attach="material"
          />
        </mesh>

        {/* Cushion */}
        <mesh
          position={[0, -0.5, 0]}
          scale={[1, 0.5, 1]}
        >
          <torusGeometry
            args={[0.55, 0.25, 32, 64]}
          />

          <primitive
            object={cushionMaterial}
            attach="material"
          />
        </mesh>
      </group>
    </group>
  );
}