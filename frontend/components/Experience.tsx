import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { Experience as ExperienceType } from '../types';

interface ExperienceProps {
    data: ExperienceType[];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              newSet.add(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.experience-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [data]);

  return (
    <section id="experience" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background Ambience */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Journey</span></h2>
          <p className="text-gray-400">A timeline of my contributions to engineering excellence.</p>
        </div>

        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10">
             <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary via-secondary to-transparent opacity-50"></div>
          </div>

          <div className="space-y-16">
            {data.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isVisible = visibleItems.has(`exp-${exp.id}`);
              
              return (
                <div 
                  key={exp.id} 
                  id={`exp-${exp.id}`}
                  className={`experience-item relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-center`}
                >
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-[9px] md:-translate-x-1/2 flex items-center justify-center z-10">
                    <div className={`w-5 h-5 rounded-full border-4 border-black bg-primary transition-all duration-700 ${isVisible ? 'scale-100 shadow-[0_0_15px_rgba(0,242,234,0.6)]' : 'scale-0'}`}></div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16' : 'md:pl-16'} w-full`}>
                    <div 
                      className={`
                        relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl 
                        hover:bg-white/10 hover:border-primary/30 transition-all duration-500 group
                        transform ${isVisible 
                          ? 'opacity-100 translate-x-0 translate-y-0' 
                          : `opacity-0 ${isEven ? 'md:-translate-x-20' : 'md:translate-x-20'} translate-y-10`
                        }
                      `}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {/* Connector Line (Desktop) */}
                      <div className={`hidden md:block absolute top-1/2 ${isEven ? '-right-16' : '-left-16'} w-16 h-px bg-white/10 group-hover:bg-primary/50 transition-colors`}></div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                          <div className="flex items-center text-gray-400 mt-1 font-medium">
                            <Briefcase className="w-4 h-4 mr-2" />
                            {exp.company}
                          </div>
                        </div>
                        <div className="flex items-center text-xs font-mono text-secondary bg-black/40 border border-white/10 px-3 py-1.5 rounded-full mt-3 sm:mt-0 w-fit">
                          <Calendar className="w-3 h-3 mr-2" />
                          {exp.duration}
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start leading-relaxed">
                            <ChevronRight className="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;