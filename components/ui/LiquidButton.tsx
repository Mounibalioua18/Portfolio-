import React from 'react';
import { cn } from '../../lib/utils';

export function LiquidButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className="relative group inline-block">
      <button
        className={cn(
          "relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-300 px-10 h-14 hover:scale-105 active:scale-95 text-white bg-brand-600 hover:bg-brand-500 outline-none",
          className
        )}
        {...props}
      >
        <div className="relative z-10 flex items-center gap-2">
          {children}
        </div>
      </button>
    </div>
  );
}