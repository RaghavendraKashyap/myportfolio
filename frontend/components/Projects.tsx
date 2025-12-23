import React, { useEffect, useRef } from 'react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
    data: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
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
  }, [data]); // Re-run if data changes

  return (
    <section id="projects" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 reveal">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Projects</span></h2>
            <p className="text-gray-400 max-w-xl text-lg">Infrastructure as Code, Serverless Architectures, Devops and K8s.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((project, index) => (
            <div 
              key={project.id} 
              className={`group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full reveal`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              
              {/* Image Area */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                <img 
                  src={project.imageUrl || 'https://via.placeholder.com/600x400'} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                />
                
                {/* Actions */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                   {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all">
                      <Github className="w-4 h-4" />
                    </a>
                   )}
                   {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-primary hover:text-black transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                   )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>
                
                <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 text-gray-300 border border-white/5 group-hover:border-primary/20 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;