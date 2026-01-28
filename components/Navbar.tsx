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
  const [activeTab, setActiveTab] = useState(items[0].name);

  useEffect(() => {
    const handleScroll = () => {
      // Offset to trigger earlier when scrolling down
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Special case for top of page
      if (window.scrollY < 100) {
        setActiveTab(items[0].name);
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
        "fixed bottom-6 sm:bottom-auto sm:top-0 left-1/2 -translate-x-1/2 z-[100] sm:pt-6 w-fit",
        className
      )}
    >
      <div className="flex items-center gap-1 sm:gap-3 bg-gray-900/40 border border-white/10 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-2xl">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 rounded-full transition-all duration-300",
                "text-gray-400 hover:text-brand-400",
                isActive && "text-brand-400"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={20} strokeWidth={2.5} />
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-brand-500/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Lamp Glow Effect */}
                  <div className="absolute -top-1 sm:-top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-500 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-brand-500/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-brand-500/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-brand-500/40 rounded-full blur-sm top-0 left-2" />
                  </div>
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