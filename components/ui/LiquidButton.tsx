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
          "relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 px-10 h-14 hover:scale-105 active:scale-95 text-white outline-none",
          className
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 z-0 h-full w-full rounded-full 
            shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(255,255,255,0.1),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.3),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.3),inset_0_0_6px_6px_rgba(255,255,255,0.05),inset_0_0_2px_2px_rgba(255,255,255,0.02),0_0_12px_rgba(255,255,255,0.1)] 
        transition-all 
        dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
        
        <div
          className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
          style={{ backdropFilter: 'url("#container-glass")' }}
        />

        <div className="relative z-10 flex items-center gap-2">
          {children}
        </div>
      </button>
    </div>
  );
}