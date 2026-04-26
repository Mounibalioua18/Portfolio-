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
        <div className="flex items-center justify-center gap-1 lg:gap-3 bg-white/90 backdrop-blur-xl border border-slate-900/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-1.5 px-2 rounded-full">
          
          {/* Logo */}
          <a 
            href="#home"
            onClick={() => setActiveTab('')}
            className={cn(
              "px-3 py-1.5 ml-1 rounded-full flex items-center justify-center transition-all duration-300 relative group font-serif italic font-bold tracking-tight text-xl cursor-pointer",
              activeTab === '' ? 'text-brand-600' : 'text-slate-900 hover:text-brand-600'
            )}
          >
            <span>Mounib</span>
            <span className="text-sm text-slate-400 font-sans not-italic group-hover:text-brand-500 transition-colors">.dev</span>
             
             {activeTab === '' && (
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
                  "relative cursor-pointer text-xs lg:text-sm font-bold px-2 lg:px-6 py-2 rounded-full transition-all duration-300 flex items-center justify-center min-w-[2.5rem]",
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
      <div className="fixed top-4 left-4 right-4 z-[100] flex items-center justify-between bg-white/95 backdrop-blur-xl border border-slate-900/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-2 md:hidden pointer-events-auto">
        
        {/* Mobile Logo */}
        <a 
          href="#home"
          onClick={() => handleMobileNavClick('')}
          className="px-3 py-2 font-serif italic font-bold text-2xl tracking-tight group flex items-baseline"
        >
          <span className="text-brand-600">Mounib</span>
          <span className="text-slate-400 text-lg transition-colors group-hover:text-brand-500 font-sans not-italic">.dev</span>
        </a>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 mr-1 rounded-xl shrink-0 flex items-center justify-center bg-brand-50 text-brand-600 active:scale-95 transition-transform"
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
              className="fixed inset-0 z-[90] bg-slate-900/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Dropdown Menu Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top right' }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-20 right-4 z-[100] w-56 bg-white/95 backdrop-blur-xl border border-slate-900/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex flex-col md:hidden"
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
                      "flex items-center justify-between p-3 w-full rounded-xl transition-all group",
                      isActive 
                        ? "bg-brand-600 text-white font-bold shadow-lg shadow-brand-600/20" 
                        : "text-slate-600 font-medium active:bg-slate-100 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg transition-colors flex items-center justify-center",
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:text-brand-600 group-hover:bg-brand-50"
                      )}>
                        <Icon size={18} strokeWidth={isActive ? 3 : 2} />
                      </div>
                      <span className="text-[15px]">{item.name}</span>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-white mr-1 shadow-sm"></div>
                    )}
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