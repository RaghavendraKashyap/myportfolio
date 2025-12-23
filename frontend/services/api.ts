import { Project, Experience, Skill, Certification, ContactMessage } from '../types';
import { PROJECTS_DATA, EXPERIENCE_DATA, SKILLS_DATA, CERTIFICATIONS_DATA, CONTACT_MESSAGES_DATA } from './mockData';

// Configuration for your backend
const API_URL = 'http://localhost:5000/api'; 
const USE_MOCK = false; 

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getLocal = (key: string, defaultData: any) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultData;
};

const setLocal = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    options.credentials = 'include';
    if (!options.headers && (options.method === 'POST' || options.method === 'PUT')) {
        options.headers = { 'Content-Type': 'application/json' };
    }
    const res = await fetch(url, options);
    if (!res.ok) {
        if (res.status === 401) throw new Error('Unauthorized');
        throw new Error('API Request Failed');
    }
    return res;
};

export const api = {
  getProjects: async (): Promise<Project[]> => {
    if (USE_MOCK) return getLocal('projects', PROJECTS_DATA);
    try { return await (await fetch(`${API_URL}/projects`)).json(); } 
    catch (e) { return getLocal('projects', PROJECTS_DATA); }
  },
  saveProject: async (project: Project): Promise<Project> => {
    if (USE_MOCK) { /* ... mock logic ... */ return project; }
    const method = project.id ? 'PUT' : 'POST';
    const url = project.id ? `${API_URL}/projects/${project.id}` : `${API_URL}/projects`;
    const body = { ...project }; if (body.id) delete (body as any).id;
    return (await fetchWithAuth(url, { method, body: JSON.stringify(body) })).json();
  },
  deleteProject: async (id: string): Promise<void> => {
    if (USE_MOCK) return;
    await fetchWithAuth(`${API_URL}/projects/${id}`, { method: 'DELETE' });
  },

  getExperience: async (): Promise<Experience[]> => {
    if (USE_MOCK) return getLocal('experience', EXPERIENCE_DATA);
    try { return await (await fetch(`${API_URL}/experience`)).json(); } catch(e) { return []; }
  },
  saveExperience: async (exp: Experience): Promise<Experience> => {
      const method = exp.id ? 'PUT' : 'POST';
      const url = exp.id ? `${API_URL}/experience/${exp.id}` : `${API_URL}/experience`;
      const body = { ...exp }; if (body.id) delete (body as any).id;
      return (await fetchWithAuth(url, { method, body: JSON.stringify(body) })).json();
  },
  deleteExperience: async (id: string): Promise<void> => {
      await fetchWithAuth(`${API_URL}/experience/${id}`, { method: 'DELETE' });
  },

  getSkills: async (): Promise<Skill[]> => {
    try { return await (await fetch(`${API_URL}/skills`)).json(); } catch(e) { return []; }
  },
  saveSkill: async (skill: Skill, originalName?: string): Promise<Skill> => {
    const url = originalName ? `${API_URL}/skills/${encodeURIComponent(originalName)}` : `${API_URL}/skills`;
    const method = originalName ? 'PUT' : 'POST';
    return (await fetchWithAuth(url, { method, body: JSON.stringify(skill) })).json();
  },
  deleteSkill: async (name: string): Promise<void> => {
    await fetchWithAuth(`${API_URL}/skills/${encodeURIComponent(name)}`, { method: 'DELETE' });
  },

  getCertifications: async (): Promise<Certification[]> => {
    try { return await (await fetch(`${API_URL}/certifications`)).json(); } catch(e) { return []; }
  },
  saveCertification: async (cert: Certification): Promise<Certification> => {
    const method = cert.id ? 'PUT' : 'POST';
    const url = cert.id ? `${API_URL}/certifications/${cert.id}` : `${API_URL}/certifications`;
    const body = { ...cert }; if (body.id) delete (body as any).id;
    return (await fetchWithAuth(url, { method, body: JSON.stringify(body) })).json();
  },
  deleteCertification: async (id: string): Promise<void> => {
    await fetchWithAuth(`${API_URL}/certifications/${id}`, { method: 'DELETE' });
  },
  
  getMessages: async (): Promise<ContactMessage[]> => {
    try { return await (await fetchWithAuth(`${API_URL}/contact`)).json(); } catch(e) { return []; }
  },
  sendMessage: async (data: Omit<ContactMessage, 'id' | 'date'>): Promise<void> => {
      if (USE_MOCK) return;
      const res = await fetch(`${API_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to send message');
  },
  deleteMessage: async (id: string): Promise<void> => {
      await fetchWithAuth(`${API_URL}/contact/${id}`, { method: 'DELETE' });
  },

  // --- AUTH METHODS (Email/Password) ---

  login: async (email: string, password: string): Promise<boolean> => {
    if (USE_MOCK) return email === 'admin@example.com' && password === 'admin123';
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        
        if (res.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Login failed", error);
        return false;
    }
  },

  checkAuth: async (): Promise<boolean> => {
      if (USE_MOCK) return false;
      try {
          const res = await fetch(`${API_URL}/auth/user`, { credentials: 'include' });
          if (res.ok) {
              const data = await res.json();
              return data.isAuthenticated;
          }
          return false;
      } catch (e) {
          return false;
      }
  },

  logout: async (): Promise<void> => {
      if (USE_MOCK) return;
      await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
      window.location.reload();
  }
};