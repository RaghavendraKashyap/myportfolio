import React, { useEffect, useRef } from 'react';
import { Award, CheckCircle } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../services/mockData';

const Certifications: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Verified <span className="text-primary">Expertise</span></h2>
          <p className="text-gray-400">Industry-recognized validations of my cloud engineering skills.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <div 
              key={cert.id} 
              className="group relative reveal"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 group-hover:opacity-75 transition duration-500 blur-sm group-hover:blur-md"></div>
              
              <div className="relative bg-surface rounded-2xl p-8 border border-white/10 h-full flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                
                {/* Badge Glow */}
                <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>

                <div className="relative z-10 bg-surfaceHighlight p-4 rounded-full mb-6 border border-white/10 shadow-lg group-hover:border-primary/50 transition-colors">
                  {cert.image ? (
                     <img src={cert.image} alt={cert.issuer} className="w-12 h-12 object-contain" />
                  ) : (
                     <Award className="w-12 h-12 text-primary" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-gray-400 text-sm font-medium mb-1">{cert.issuer}</p>
                <p className="text-xs text-gray-500 mb-6 font-mono">{cert.date}</p>

                <div className="mt-auto">
                    <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5 transition-colors cursor-pointer"
                    >
                        <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                        View Credential
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;