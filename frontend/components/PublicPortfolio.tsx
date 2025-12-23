import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Certifications from './Certifications';
import Contact from './Contact';
import Background from './Background';
import { api } from '../services/api';
import { Project, Experience as ExperienceType, Skill } from '../types';

const PublicPortfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  
  useEffect(() => {
    // Load data from API/Mock
    const loadData = async () => {
        const [projData, expData, skillData] = await Promise.all([
            api.getProjects(),
            api.getExperience(),
            api.getSkills()
        ]);
        setProjects(projData);
        setExperience(expData);
        setSkills(skillData);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-primary selection:text-black relative">
      <Background 
        colorStops={["#3A29FF", "#FF0055", "#00F2EA"]}
        speed={0.4}
        amplitude={1.1}
      />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Experience data={experience} />
          <Projects data={projects} />
          <Certifications />
          <Skills data={skills} />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default PublicPortfolio;