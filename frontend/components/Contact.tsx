import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../services/mockData';
import { api } from '../services/api';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, Loader2, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const getIcon = (name: string) => {
    if (name === 'GitHub') return <Github className="w-6 h-6" />;
    if (name === 'LinkedIn') return <Linkedin className="w-6 h-6" />;
    if (name === 'Twitter') return <Twitter className="w-6 h-6" />;
    return <Mail className="w-6 h-6" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
        await api.sendMessage(formData);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
        console.error(error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-surface/60 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             
             {/* Left Column: Text & Socials */}
             <div className="flex flex-col space-y-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's <span className="text-primary">Connect</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      Whether you have a question or need help with cloud, or just want to say hi, please feel free to reach out to me . I'm always open to new opportunities.
                    </p>
                </div>

                <div className="w-full h-48 rounded-xl overflow-hidden border border-white/10 relative group">
                   <img 
                      src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" 
                      alt="Tech Connectivity" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                   />
                   <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {SOCIAL_LINKS.map((link) => (
                    <a 
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 hover:translate-x-1 transition-all border border-white/5 hover:border-primary/30 group"
                    >
                      <span className="text-gray-400 group-hover:text-primary transition-colors mr-3">
                        {getIcon(link.platform)}
                      </span>
                      <span className="text-gray-200 font-medium text-sm">{link.platform}</span>
                    </a>
                  ))}
                </div>
             </div>

             {/* Right Column: Form */}
             <div className="bg-white/5 rounded-xl p-8 border border-white/5 shadow-inner relative">
                
                {status === 'success' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/95 backdrop-blur-sm z-20 rounded-xl animate-fade-in-up">
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                        <p className="text-gray-400 mt-2">I'll get back to you soon.</p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                        >
                            Send another
                        </button>
                    </div>
                )}
                
                {status === 'error' && (
                    <div className="absolute top-0 left-0 w-full p-4 bg-red-500/20 border-b border-red-500/50 text-red-200 text-center rounded-t-xl">
                        Failed to send message. Please try again.
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                      <input 
                        required
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      <input 
                        required
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                      <textarea 
                        required
                        id="message" 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600"
                        placeholder="Hello! I'd like to discuss a project..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={status === 'submitting'}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending...
                          </>
                      ) : (
                          <>
                            Send Message <Send className="ml-2 w-4 h-4" />
                          </>
                      )}
                    </button>
                </form>
             </div>
          </div>
        </div>
        
        <div className="text-center mt-12 text-gray-600 text-sm flex flex-col items-center gap-2">
          <p>© {new Date().getFullYear()} Raghavendra K. Built with ❤️ & cloud ☁️.</p>
          <Link to="/admin" className="opacity-10 hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-primary">
            <Lock className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;