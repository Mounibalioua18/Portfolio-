import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const handleMobileNavClick = (name: string) => {
    setActiveTab(name);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* 
        Desktop Navbar (md and up)
      */}
      <div
        className={cn(
          "fixed top-0 left-1/2 -translate-x-1/2 z-[100] pt-6 w-max hidden md:block",
          className
        )}
      >
        <div className="flex items-center justify-center gap-2 lg:gap-3 bg-white/80 backdrop-blur-lg border border-brand-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-1.5 px-2 rounded-full overflow-hidden">
          
          {/* Logo */}
          <a 
            href="#home"
            onClick={() => setActiveTab('')}
            className={`w-10 h-10 ml-1 rounded-full flex items-center justify-center border transition-all duration-300 relative overflow-hidden group ${
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
          <div className="w-[1px] h-6 bg-brand-200/50 mx-1"></div>

          {items.map((item) => {
            const isActive = activeTab === item.name;

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-bold px-4 lg:px-6 py-2 rounded-full transition-all duration-300 flex items-center justify-center min-w-[2.5rem]",
                  "text-slate-950 hover:text-slate-950",
                  isActive && "text-slate-950"
                )}
              >
                <span>{item.name}</span>
                
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
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-500 rounded-full shadow-[0_2px_8px_rgba(20,184,166,0.3)]" />
                  </motion.div>
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* 
        Mobile Header & Hamburger (below md)
      */}
      <div className="fixed top-0 left-0 w-full p-4 z-[100] flex items-center justify-between md:hidden pointer-events-none">
        
        {/* Mobile Logo */}
        <a 
          href="#home"
          onClick={() => handleMobileNavClick('')}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 pointer-events-auto backdrop-blur-sm ${
            activeTab === '' 
              ? 'bg-brand-500 text-white border-brand-500 shadow-[0_0_15px_-3px_rgba(20,184,166,0.5)]' 
              : 'bg-white/80 text-brand-600 border-brand-200 shadow-sm'
          }`}
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 21V4L12 14L20 4V21H16V9.5L12 14.5L8 9.5V21H4Z" />
            </svg>
        </a>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center border border-brand-200 bg-white/80 text-brand-600 backdrop-blur-sm shadow-sm pointer-events-auto active:scale-95 transition-transform"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/*
        Mobile Fullscreen Menu Overlay -> Changed to Floating Dropdown
      */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop for closing when clicking outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[90] bg-slate-900/10 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Dropdown Menu Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top right' }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-16 right-4 z-[100] w-56 bg-white/95 backdrop-blur-xl border border-brand-100/80 rounded-2xl shadow-2xl p-2 flex flex-col md:hidden"
            >
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;

                return (
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={() => handleMobileNavClick(item.name)}
                    className={cn(
                      "flex items-center gap-3 text-sm font-semibold p-2.5 w-full rounded-xl transition-all",
                      isActive 
                        ? "bg-brand-50 text-brand-600" 
                        : "text-slate-600 active:bg-slate-50 hover:bg-slate-50"
                    )}
                  >
                    <div className={cn(
                      "p-1.5 rounded-lg",
                      isActive ? "bg-brand-100/50 text-brand-600" : "bg-slate-100/50 text-slate-500"
                    )}>
                      <Icon size={16} strokeWidth={2.5} />
                    </div>
                    {item.name}
                  </a>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;