import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

const Navbar: React.FC<NavBarProps> = ({ items, className }) => {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Offset to trigger earlier when scrolling down
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Special case for top of page
      if (window.scrollY < 100) {
        setActiveTab('');
        return;
      }

      for (const item of items) {
        // Remove the '#' to get ID
        const sectionId = item.url.replace('#', '');
        const element = document.getElementById(sectionId);
        
        if (element) {
          const { offsetTop, offsetHeight } = element;
          // Check if scroll position is within this section
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveTab(item.name);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <div
      className={cn(
        "fixed top-4 sm:top-0 left-1/2 -translate-x-1/2 z-[100] sm:pt-6 w-[96vw] max-w-fit",
        className
      )}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-3 bg-white/80 backdrop-blur-lg border border-brand-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-1.5 px-1.5 sm:px-2 rounded-full overflow-x-auto no-scrollbar">
        
        {/* Logo */}
        <a 
          href="#home"
          onClick={() => setActiveTab('')}
          className={`w-8 h-8 sm:w-10 sm:h-10 ml-1 rounded-full flex items-center justify-center border transition-all duration-300 relative overflow-hidden group ${
            activeTab === '' 
              ? 'bg-brand-500 text-white border-brand-500 shadow-[0_0_15px_-3px_rgba(20,184,166,0.5)]' 
              : 'bg-gradient-to-br from-brand-500/20 to-brand-600/5 text-slate-950 border-brand-500/20 hover:border-brand-500 hover:text-brand-600 shadow-[0_0_10px_-3px_rgba(20,184,166,0.2)]'
          }`}
        >
           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-110 transition-transform duration-300 relative z-10">
             <path d="M4 21V4L12 14L20 4V21H16V9.5L12 14.5L8 9.5V21H4Z" />
           </svg>
        </a>
        
        {/* Divider */}
        <div className="w-[1px] h-6 bg-brand-200/50 mx-1 hidden sm:block"></div>

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-bold px-2.5 sm:px-6 py-2 sm:py-2 rounded-full transition-all duration-300 flex items-center justify-center min-w-[2.5rem]",
                "text-slate-950 hover:text-slate-950",
                isActive && "text-slate-950"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden flex items-center justify-center">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-brand-50 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Clean flat top border */}
                  <div className="absolute -top-1 sm:-top-2 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1 bg-brand-500 rounded-full shadow-[0_2px_8px_rgba(20,184,166,0.3)]" />
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;