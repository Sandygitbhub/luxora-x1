"use client";

import { useState } from "react";
import { HeadphoneColor } from "@/hooks/useColorCustomizer";
import ColorPicker from "./ColorPicker";
import { Check, Loader2, Minus, Plus, RefreshCcw } from "lucide-react";

interface ConfiguratorUIProps {
  activeColor: HeadphoneColor;
  handleColorChange: (color: HeadphoneColor) => void;
  availableColors: HeadphoneColor[];
}

export default function ConfiguratorUI({ activeColor, handleColorChange, availableColors }: ConfiguratorUIProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const basePrice = 499;

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + delta)));
  };

  const handleReset = () => {
    handleColorChange(availableColors[0]);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center p-6 lg:p-10 xl:p-12 z-10 glassmorphism rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl relative">
      
      <button 
        onClick={handleReset}
        className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
        aria-label="Reset configuration"
        title="Reset configuration"
      >
        <RefreshCcw className="w-5 h-5" />
      </button>

      <div className="mb-6 configurator-text">
        <h2 className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-2">Configure Your</h2>
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4">LUXORA X1</h1>
        <p className="text-gray-400 text-lg font-light leading-relaxed">
          Experience uncompromising audio fidelity wrapped in a bespoke design. Select your signature finish.
        </p>
      </div>

      <div className="mb-8 border-t border-white/10 pt-6 configurator-options flex flex-col gap-6">
        <ColorPicker 
          colors={availableColors} 
          activeColor={activeColor} 
          onChange={handleColorChange} 
        />

        <div className="flex flex-col gap-2">
           <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest">Quantity</h3>
           <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full w-max px-4 py-2">
             <button 
                onClick={() => handleQuantityChange(-1)}
                className="p-1 hover:text-white text-gray-400 transition-colors"
                aria-label="Decrease quantity"
             >
                <Minus className="w-4 h-4" />
             </button>
             <span className="text-white font-medium min-w-[20px] text-center">{quantity}</span>
             <button 
                onClick={() => handleQuantityChange(1)}
                className="p-1 hover:text-white text-gray-400 transition-colors"
                aria-label="Increase quantity"
             >
                <Plus className="w-4 h-4" />
             </button>
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-auto configurator-price">
        <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 uppercase tracking-wider mb-1">Total Price</span>
            <span className="text-3xl font-light text-white">${(basePrice * quantity).toLocaleString()}</span>
          </div>
          <span className="text-sm text-gray-500 hidden sm:block">Free Engraving</span>
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={isAdding || isAdded}
          className="w-full h-14 flex items-center justify-center bg-white text-black text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed outline-none focus:ring-4 focus:ring-white/50"
        >
          {isAdding ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isAdded ? (
            <span className="flex items-center gap-2"><Check className="w-5 h-5" /> Added to Bag</span>
          ) : (
            "Add to Bag"
          )}
        </button>
      </div>
    </div>
  );
}
