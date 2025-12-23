import React, { useState, useEffect } from 'react';
import { Menu, X, Cloud } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    if (targetId === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Navbar height + buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between ${
          scrolled 
            ? 'bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-full px-6 py-3 w-full max-w-4xl' 
            : 'bg-transparent w-full max-w-7xl px-0 py-2'
        }`}
      >
        {/* Logo Section */}
        <div 
            className="flex items-center space-x-2 group cursor-pointer flex-shrink-0" 
            onClick={(e) => handleScrollTo(e, '#')}
        >
            <div className={`p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 transition-colors`}>
                <Cloud className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
            </div>
            <span className={`font-bold text-lg tracking-tight ${scrolled ? 'text-white' : 'text-white'}`}>
                Raghavendra
            </span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center bg-black/20 rounded-full px-2 py-1 border border-white/5 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center space-x-1">
                {navLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
                >
                    {link.name}
                </a>
                ))}
            </div>
        </div>

        <div className="hidden md:block flex-shrink-0">
            <a 
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="px-5 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-primary hover:scale-105 transition-all shadow-lg cursor-pointer flex items-center"
            >
                Hire Me
            </a>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-white bg-white/10 hover:bg-white/20 focus:outline-none"
            >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-5 w-5" /> : <Menu className="block h-5 w-5" />}
            </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-4 px-4 md:hidden">
            <div className="bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-gray-300 hover:text-white hover:bg-white/10 block px-4 py-3 rounded-xl text-base font-medium cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;