import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Terminal, Cloud, Server } from 'lucide-react';
import { HERO_DATA } from '../services/mockData';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Every System Scales If You Architect It To Survive";
  const [showCursor, setShowCursor] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);

  // Typewriter Effect
  useEffect(() => {
    let index = 0;
    // Initial delay before typing starts
    const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(fullText.slice(0, index + 1));
          index++;
          if (index > fullText.length) {
            clearInterval(intervalId);
          }
        }, 50); // Speed of typing
        return () => clearInterval(intervalId);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  // Cursor Blink Effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Particle System Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Add some ambient particles
    for(let i=0; i<20; i++) {
        particles.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: Math.random(),
            color: Math.random() > 0.5 ? '#00f2ea' : '#7000ff', // Primary or Secondary
            size: Math.random() * 2
        });
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.current.length; i++) {
            const p = particles.current[i];
            
            p.x += p.vx;
            p.y += p.vy;
            
            // Fade out particles
            p.life -= 0.02;

            if (p.life <= 0) {
                particles.current.splice(i, 1);
                i--;
                continue;
            }

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  // Spawn particles when text changes (typing effect)
  useEffect(() => {
    if (!cursorRef.current || !canvasRef.current || text.length === 0) return;

    const rect = cursorRef.current.getBoundingClientRect();
    const canvasRect = canvasRef.current.getBoundingClientRect();
    
    // Calculate relative position
    const x = rect.left - canvasRect.left + rect.width / 2;
    const y = rect.top - canvasRect.top + rect.height / 2;

    const colors = ['#00f2ea', '#7000ff', '#ffffff', '#ff0055'];
    
    // Spawn a burst
    for (let i = 0; i < 5; i++) {
        particles.current.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 4, // Faster horizontal spread
            vy: (Math.random() - 1) * 4 - 2, // Upward momentum
            life: 1.0,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 2 + 1
        });
    }
  }, [text]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
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
    }
  };

  // Split text for coloring logic
  const splitIndex = "Every System Scales".length;
  const firstPart = text.slice(0, splitIndex);
  const secondPart = text.length > splitIndex ? text.slice(splitIndex) : "";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      
      {/* Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10 relative">
        
        {/* Terminal / Code Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 mt-16 backdrop-blur-sm animate-fade-in-up">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs font-mono text-primary">~/{HERO_DATA.role.toLowerCase().replace(' ', '-')}</span>
        </div>

        {/* Typewriter Headline */}
        <div className="min-h-[160px] md:min-h-[200px] flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {firstPart}
            </span>
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                {secondPart}
            </span>
            <span 
                ref={cursorRef}
                className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-primary ml-1 inline-block`}
                style={{ textShadow: '0 0 10px #00f2ea' }}
            >
                |
            </span>
          </h1>
        </div>

        <p className="mt-4 max-w-2xl text-xl text-gray-400 animate-fade-in-up" style={{ animationDelay: '2.5s' }}>
          {HERO_DATA.tagline}
        </p>
        
        <p className="mt-2 max-w-xl text-base text-gray-500 animate-fade-in-up" style={{ animationDelay: '2.7s' }}>
          {HERO_DATA.bio}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '2.9s' }}>
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-background bg-primary hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,242,234,0.3)] hover:shadow-[0_0_30px_rgba(0,242,234,0.5)] cursor-pointer"
          >
            View Infrastructure
            <Server className="ml-2 -mr-1 h-5 w-5" />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-base font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all cursor-pointer"
          >
            Get In Touch
            <Terminal className="ml-2 -mr-1 h-5 w-5" />
          </a>
        </div>

        {/* Floating Icons Visualization */}
        <div className="mt-20 relative w-full h-24 hidden md:flex items-center justify-center space-x-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           <Cloud className="w-12 h-12 text-gray-500 hover:text-white transition-colors animate-pulse-slow" />
           <Server className="w-10 h-10 text-gray-500 hover:text-white transition-colors animate-pulse-slow" style={{ animationDelay: '1s'}} />
           <Terminal className="w-12 h-12 text-gray-500 hover:text-white transition-colors animate-pulse-slow" style={{ animationDelay: '2s'}} />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a 
          href="#experience" 
          onClick={(e) => handleScrollTo(e, '#experience')}
          className="text-gray-500 hover:text-primary transition-colors cursor-pointer"
        >
          <span className="sr-only">Scroll down</span>
          <ChevronDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;