"use client";

import { HeadphoneColor } from "@/hooks/useColorCustomizer";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorPickerProps {
  colors: HeadphoneColor[];
  activeColor: HeadphoneColor;
  onChange: (color: HeadphoneColor) => void;
}

export default function ColorPicker({ colors, activeColor, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest">Color</h3>
        <span className="text-sm text-white font-medium">{activeColor.name}</span>
      </div>
      
      <div className="flex gap-4">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onChange(color)}
            className={cn(
              "relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
              "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black",
              "hover:scale-110",
              activeColor.id === color.id ? "scale-110 ring-2 ring-white/20 ring-offset-4 ring-offset-black" : "opacity-70 hover:opacity-100"
            )}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select ${color.name} color`}
          >
            {activeColor.id === color.id && (
              <Check 
                className="w-5 h-5 transition-transform duration-300 scale-100" 
                color={
                  // Decide checkmark color based on background hex approx brightness
                  color.hex === "#F5F5F7" || color.hex === "#E0E0E0" ? "#000" : "#FFF"
                } 
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
