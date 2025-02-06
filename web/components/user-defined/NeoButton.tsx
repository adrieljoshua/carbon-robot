import React from "react";
import { cn } from "@/lib/utils"; // Merges Tailwind classes

interface ButtonProps {
  name: string;
  className?: string;
}

const NeoButton: React.FC<ButtonProps> = ({ name, className }) => {
  return (
    <button
      className={cn(
        "px-6 py-2 font-archivo flex items-center text-black font-bold text-lg border-2 border-black bg-white",
        "shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ",
        "hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]",
        "active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 rounded-full active:translate-y-1", 
        className
      )}>
      <span>{name}</span>
    </button>
  );
};

export default NeoButton;
