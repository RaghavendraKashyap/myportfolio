import React from 'react';
import { Skill } from '../types';
import { 
  Cloud, 
  Terminal, 
  Code, 
  Database, 
  Server, 
  Globe, 
  Shield, 
  Cpu, 
  Layers,
  Box,
  GitMerge,
  Activity,
  Container,
  CloudLightning,
  Ship
} from 'lucide-react';

interface SkillsProps {
    data: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const categories = Array.from(new Set(data.map(s => s.category)));

  // Helper to get color based on skill name or category for a vibrant look
  const getSkillStyle = (name: string) => {
    const map: Record<string, { color: string, icon: any }> = {
      'AWS': { color: '#FF9900', icon: Cloud }, // AWS Orange
      'Azure': { color: '#0089D6', icon: CloudLightning }, // Azure Blue
      'Google Cloud': { color: '#4285F4', icon: Globe }, // GCP Blue
      'Terraform': { color: '#7B42BC', icon: Box }, // Purple
      'Docker': { color: '#2496ED', icon: Container }, // Docker Blue
      'Kubernetes': { color: '#326CE5', icon: Ship }, // K8s Blue
      'Python': { color: '#3776AB', icon: Code }, // Python Blue
      'Go': { color: '#00ADD8', icon: Cpu }, // Go Cyan
      'Linux': { color: '#FCC624', icon: Server }, // Linux Yellow
      'Grafana': { color: '#F46800', icon: Activity }, // Grafana Orange
      'Ansible': { color: '#EE0000', icon: Terminal }, // Red
      'TypeScript': { color: '#3178C6', icon: Code }, // TS Blue
    };

    return map[name] || { color: '#A0AEC0', icon: Terminal }; // Default gray
  };

  return (
    <section id="skills" className="py-24 bg-surface/10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Cpu className="w-64 h-64 text-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical <span className="text-accent">Arsenal</span></h2>
          <p className="text-gray-400">Tools and technologies I use to build scalable systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category} className="bg-surface/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-surface/50 hover:border-accent/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-accent rounded-full mr-3"></span>
                {category}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {data.filter(skill => skill.category === category).map((skill) => {
                   const { color, icon: Icon } = getSkillStyle(skill.name);
                   return (
                    <div 
                      key={skill.name} 
                      className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-background/50 border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden hover:-translate-y-1 cursor-default"
                    >
                      {/* Dynamic Background Glow */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300"
                        style={{ 
                          background: `radial-gradient(circle at center, ${color}, transparent 70%)` 
                        }}
                      ></div>
                      
                      <div className="group-hover:scale-110 transition-transform duration-300 mb-2 relative z-10">
                        <Icon 
                          className="w-8 h-8 transition-all duration-300" 
                          style={{ 
                            color: color,
                            filter: `drop-shadow(0 0 2px ${color}80)` // Subtle drop shadow matching color
                          }} 
                        />
                      </div>
                      
                      <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors text-center relative z-10">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;