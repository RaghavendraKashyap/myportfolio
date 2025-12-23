import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Briefcase, FolderKanban, LogOut, Plus, Trash2, Edit2, Save, X, Loader2,
    Zap, Award, MessageSquare, Mail, Calendar, Search, CloudLightning, ShieldCheck, Lock, ArrowRight, User
} from 'lucide-react';
import { api } from '../../services/api';
import { Project, Experience, Skill, Certification, ContactMessage } from '../../types';
import { useNavigate, Link, useLocation } from 'react-router-dom';

// --- Login Component ---
const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const success = await api.login(email, password);
            if (success) {
                onLogin();
            } else {
                setError('Invalid credentials');
            }
        } catch (e) {
            setError('Login failed. Check connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans">
            {/* Ambient Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[128px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[128px] animate-pulse-slow" style={{animationDelay:'2s'}}></div>

            <div className="bg-surface/60 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md relative z-10 flex flex-col">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-6 shadow-inner">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Access</h2>
                    <p className="text-gray-400 text-sm text-center">Enter your credentials to manage infrastructure.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email Address</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder-gray-600"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder-gray-600"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                            {error}
                        </div>
                    )}
                    
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full group relative bg-white text-black font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-70 overflow-hidden mt-4"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <div className="flex justify-center items-center gap-2 relative z-10">
                            {loading ? (
                                <Loader2 className="animate-spin w-5 h-5" /> 
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </div>
                    </button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-white/5 w-full flex justify-center">
                    <Link to="/" className="text-gray-500 hover:text-white text-xs transition-colors flex items-center gap-2 group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
};

// ... (ProjectsEditor, ExperienceEditor, SkillsEditor, CertificationsEditor, MessagesViewer remain largely the same logic-wise, assuming they are defined elsewhere or above. 
// Since I am providing the FULL file content, I must include them here.)

// --- Projects Editor ---
const ProjectsEditor: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editing, setEditing] = useState<Project | null>(null);

    useEffect(() => { load(); }, []);
    const load = async () => setProjects(await api.getProjects());

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!editing) return;
        await api.saveProject(editing);
        setEditing(null);
        load();
    };
    const handleDelete = async (id: string) => {
        if(confirm('Delete?')) { await api.deleteProject(id); load(); }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Projects</h2>
                <button onClick={() => setEditing({ id: '', title: '', description: '', tags: [], imageUrl: '' })} className="flex items-center px-4 py-2 bg-primary text-black rounded-lg hover:bg-cyan-300 font-bold text-sm"><Plus className="w-4 h-4 mr-2" /> New Project</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {projects.map(p => (
                    <div key={p.id} className="bg-surface/50 border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:border-white/20 transition-all">
                        <div className="flex items-center space-x-4">
                            <img src={p.imageUrl} className="w-12 h-12 rounded-lg object-cover bg-white/5" alt="" />
                            <div>
                                <h3 className="text-white font-bold">{p.title}</h3>
                                <p className="text-gray-400 text-xs truncate max-w-md">{p.description}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setEditing(p)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
            {editing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">{editing.id ? 'Edit Project' : 'New Project'}</h3>
                            <button onClick={() => setEditing(null)}><X className="text-gray-400 hover:text-white" /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary outline-none" placeholder="Title" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} required />
                            <textarea className="w-full bg-black/30 border border-white/10 rounded p-3 text-white h-24 focus:border-primary outline-none" placeholder="Description" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} required />
                            <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary outline-none" placeholder="Image URL" value={editing.imageUrl} onChange={e => setEditing({...editing, imageUrl: e.target.value})} required />
                            <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary outline-none" placeholder="Tags (comma separated)" value={editing.tags.join(', ')} onChange={e => setEditing({...editing, tags: e.target.value.split(',').map(s => s.trim())})} />
                            <div className="grid grid-cols-2 gap-4">
                                <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary outline-none" placeholder="GitHub URL" value={editing.githubUrl || ''} onChange={e => setEditing({...editing, githubUrl: e.target.value})} />
                                <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary outline-none" placeholder="Demo URL" value={editing.demoUrl || ''} onChange={e => setEditing({...editing, demoUrl: e.target.value})} />
                            </div>
                            <button className="w-full bg-primary text-black font-bold py-3 rounded-lg mt-4 flex justify-center items-center"><Save className="w-4 h-4 mr-2" /> Save Project</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Experience Editor ---
const ExperienceEditor: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [editing, setEditing] = useState<Experience | null>(null);

    useEffect(() => { load(); }, []);
    const load = async () => setExperiences(await api.getExperience());
    const handleSave = async (e: React.FormEvent) => { e.preventDefault(); if(!editing) return; await api.saveExperience(editing); setEditing(null); load(); };
    const handleDelete = async (id: string) => { if(confirm('Delete?')) { await api.deleteExperience(id); load(); } };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Experience</h2>
                <button onClick={() => setEditing({ id: '', role: '', company: '', duration: '', description: [''] })} className="flex items-center px-4 py-2 bg-primary text-black rounded-lg hover:bg-cyan-300 font-bold text-sm"><Plus className="w-4 h-4 mr-2" /> Add Role</button>
            </div>
            <div className="space-y-4">
                {experiences.map(exp => (
                    <div key={exp.id} className="bg-surface/50 border border-white/5 p-4 rounded-xl flex justify-between items-start group hover:border-white/20 transition-all">
                        <div>
                            <h3 className="text-white font-bold">{exp.role}</h3>
                            <p className="text-primary text-sm">{exp.company}</p>
                            <p className="text-gray-500 text-xs mt-1">{exp.duration}</p>
                        </div>
                        <div className="flex space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setEditing(exp)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(exp.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
            {editing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Edit Experience</h3>
                            <button onClick={() => setEditing(null)}><X className="text-gray-400 hover:text-white" /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="Role" value={editing.role} onChange={e => setEditing({...editing, role: e.target.value})} required />
                                <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="Company" value={editing.company} onChange={e => setEditing({...editing, company: e.target.value})} required />
                            </div>
                            <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="Duration" value={editing.duration} onChange={e => setEditing({...editing, duration: e.target.value})} required />
                            <textarea className="w-full bg-black/30 border border-white/10 rounded p-3 text-white h-32" placeholder="Description (lines)" value={editing.description.join('\n')} onChange={e => setEditing({...editing, description: e.target.value.split('\n')})} required />
                            <button className="w-full bg-primary text-black font-bold py-3 rounded-lg mt-4 flex justify-center items-center"><Save className="w-4 h-4 mr-2" /> Save</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Skills Editor ---
const SkillsEditor: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [editing, setEditing] = useState<Skill | null>(null);
    const [originalName, setOriginalName] = useState<string>('');

    useEffect(() => { load(); }, []);
    const load = async () => setSkills(await api.getSkills());
    const handleSave = async (e: React.FormEvent) => { e.preventDefault(); if(!editing) return; await api.saveSkill(editing, originalName); setEditing(null); load(); };
    const handleDelete = async (name: string) => { if(confirm('Delete?')) { await api.deleteSkill(name); load(); } };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Skills</h2>
                <button onClick={() => { setEditing({ name: '', category: 'Tools', icon: 'Terminal' }); setOriginalName(''); }} className="flex items-center px-4 py-2 bg-primary text-black rounded-lg hover:bg-cyan-300 font-bold text-sm"><Plus className="w-4 h-4 mr-2" /> Add Skill</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map(skill => (
                    <div key={skill.name} className="bg-surface/50 border border-white/5 p-4 rounded-xl group hover:border-white/20 transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-white font-bold">{skill.name}</h3>
                            <span className="text-[10px] uppercase text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">{skill.category}</span>
                        </div>
                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity mt-4">
                            <button onClick={() => { setEditing({...skill}); setOriginalName(skill.name); }} className="p-1.5 text-gray-400 hover:text-white rounded"><Edit2 className="w-3 h-3" /></button>
                            <button onClick={() => handleDelete(skill.name)} className="p-1.5 text-red-400 hover:text-red-300 rounded"><Trash2 className="w-3 h-3" /></button>
                        </div>
                    </div>
                ))}
            </div>
            {editing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface border border-white/10 rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Edit Skill</h3>
                            <button onClick={() => setEditing(null)}><X className="text-gray-400 hover:text-white" /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="Name" value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} required />
                            <select className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" value={editing.category} onChange={e => setEditing({...editing, category: e.target.value as any})}>
                                {['Cloud', 'DevOps', 'Languages', 'Tools'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="Icon" value={editing.icon} onChange={e => setEditing({...editing, icon: e.target.value})} />
                            <button className="w-full bg-primary text-black font-bold py-3 rounded-lg mt-4"><Save className="w-4 h-4 inline mr-2" /> Save</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Certifications Editor ---
const CertificationsEditor: React.FC = () => {
    const [certs, setCerts] = useState<Certification[]>([]);
    const [editing, setEditing] = useState<Certification | null>(null);

    useEffect(() => { load(); }, []);
    const load = async () => setCerts(await api.getCertifications());
    const handleSave = async (e: React.FormEvent) => { e.preventDefault(); if(!editing) return; await api.saveCertification(editing); setEditing(null); load(); };
    const handleDelete = async (id: string) => { if(confirm('Delete?')) { await api.deleteCertification(id); load(); } };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Certifications</h2>
                <button onClick={() => setEditing({ id: '', title: '', issuer: '', date: '', image: '', credentialUrl: '' })} className="flex items-center px-4 py-2 bg-primary text-black rounded-lg hover:bg-cyan-300 font-bold text-sm"><Plus className="w-4 h-4 mr-2" /> Add</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certs.map(cert => (
                    <div key={cert.id} className="bg-surface/50 border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:border-white/20 transition-all">
                        <div className="flex items-center space-x-4">
                            <Award className="w-8 h-8 text-primary" />
                            <div>
                                <h3 className="text-white font-bold text-sm">{cert.title}</h3>
                                <p className="text-gray-400 text-xs">{cert.issuer}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setEditing(cert)} className="p-2 text-gray-400 hover:text-white rounded"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(cert.id)} className="p-2 text-red-400 hover:text-red-300 rounded"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
            {editing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface border border-white/10 rounded-2xl p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Edit Cert</h3>
                            <button onClick={() => setEditing(null)}><X className="text-gray-400 hover:text-white" /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="Title" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} required />
                            <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="Issuer" value={editing.issuer} onChange={e => setEditing({...editing, issuer: e.target.value})} required />
                            <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="Date" value={editing.date} onChange={e => setEditing({...editing, date: e.target.value})} required />
                            <input className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="Credential URL" value={editing.credentialUrl} onChange={e => setEditing({...editing, credentialUrl: e.target.value})} required />
                            <button className="w-full bg-primary text-black font-bold py-3 rounded-lg mt-4"><Save className="w-4 h-4 inline mr-2" /> Save</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Messages Viewer ---
const MessagesViewer: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    useEffect(() => { load(); }, []);
    const load = async () => setMessages(await api.getMessages());
    const handleDelete = async (id: string) => { if(confirm('Delete?')) { await api.deleteMessage(id); load(); } };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white">Inbox <span className="text-sm font-normal text-gray-500 ml-2">{messages.length} messages</span></h2>
            {messages.length === 0 ? <p className="text-gray-500">No messages.</p> : (
                <div className="grid gap-4">
                    {messages.map(msg => (
                        <div key={msg.id} className="bg-surface/50 border border-white/5 p-6 rounded-xl flex flex-col md:flex-row gap-6 hover:bg-surface/70 transition-all">
                            <div className="flex-1">
                                <h3 className="text-white font-bold">{msg.name} <span className="text-gray-500 font-normal text-sm ml-2">{msg.email}</span></h3>
                                <p className="text-gray-300 mt-2 p-3 bg-black/30 rounded border border-white/5">{msg.message}</p>
                            </div>
                            <button onClick={() => handleDelete(msg.id)} className="text-red-400 hover:text-red-300 self-start md:self-center"><Trash2 className="w-5 h-5" /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Main Admin Layout ---
const AdminPortal: React.FC = () => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const [activeTab, setActiveTab] = useState('projects');
    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {
            const isAuth = await api.checkAuth();
            setAuthenticated(isAuth);
        };
        check();
    }, []);

    const handleLogout = async () => { await api.logout(); setAuthenticated(false); };

    if (authenticated === null) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-primary w-8 h-8"/></div>;
    
    // Pass a callback to update state immediately upon success
    if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />;

    return (
        <div className="min-h-screen bg-background text-gray-200 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-surface border-r border-white/5 flex flex-col fixed h-full z-20">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-bold text-white">Admin<span className="text-primary">Portal</span></h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {[
                        { id: 'projects', icon: FolderKanban, label: 'Projects' },
                        { id: 'experience', icon: Briefcase, label: 'Experience' },
                        { id: 'skills', icon: Zap, label: 'Skills' },
                        { id: 'certifications', icon: Award, label: 'Certifications' },
                        { id: 'messages', icon: MessageSquare, label: 'Messages' }
                    ].map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-white/5 text-gray-400'}`}>
                            <item.icon className="w-5 h-5" /> <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"><LogOut className="w-5 h-5" /><span className="font-medium">Sign Out</span></button>
                </div>
            </aside>
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto">
                    {activeTab === 'projects' && <ProjectsEditor />}
                    {activeTab === 'experience' && <ExperienceEditor />}
                    {activeTab === 'skills' && <SkillsEditor />}
                    {activeTab === 'certifications' && <CertificationsEditor />}
                    {activeTab === 'messages' && <MessagesViewer />}
                </div>
            </main>
        </div>
    );
};

export default AdminPortal;