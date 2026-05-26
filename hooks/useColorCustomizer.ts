import { useState, useCallback } from "react";

export type HeadphoneColor = {
  id: string;
  name: string;
  hex: string;
  materialReflectivity: number;
  materialRoughness: number;
  materialMetalness: number;
};

export const COLORS: HeadphoneColor[] = [
  {
    id: "matte-black",
    name: "Matte Black",
    hex: "#1A1A1A",
    materialReflectivity: 0.1,
    materialRoughness: 0.8,
    materialMetalness: 0.1,
  },
  {
    id: "silver",
    name: "Silver",
    hex: "#E0E0E0",
    materialReflectivity: 0.8,
    materialRoughness: 0.2,
    materialMetalness: 0.9,
  },
  {
    id: "midnight-blue",
    name: "Midnight Blue",
    hex: "#0F1A2C",
    materialReflectivity: 0.4,
    materialRoughness: 0.5,
    materialMetalness: 0.3,
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    hex: "#B76E79",
    materialReflectivity: 0.9,
    materialRoughness: 0.15,
    materialMetalness: 0.85,
  },
  {
    id: "white-titanium",
    name: "White Titanium",
    hex: "#F5F5F7",
    materialReflectivity: 0.5,
    materialRoughness: 0.4,
    materialMetalness: 0.6,
  },
];

export function useColorCustomizer() {
  const [activeColor, setActiveColor] = useState<HeadphoneColor>(COLORS[0]);

  const handleColorChange = useCallback((color: HeadphoneColor) => {
    setActiveColor(color);
  }, []);

  return {
    activeColor,
    handleColorChange,
    availableColors: COLORS,
  };
}
