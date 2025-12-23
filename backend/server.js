require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Configuration ---
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Admin Credentials (Set these in your .env ile)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// Middleware
app.use(cors({
    origin: [FRONTEND_URL, 'http://localhost:5173'],
    credentials: true 
}));
app.use(express.json());

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev_secret_key_123',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

// --- Auth Middleware ---
const checkAuth = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// --- MongoDB Connection ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Raghavendra:<PASSWORD>@cluster0.nugj9vn.mongodb.net/portfolio?retryWrites=true&w=majority';

if (!MONGODB_URI.includes('<PASSWORD>')) {
    mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));
}

// --- Schemas ---
const toJSONConfig = {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
};

const ProjectSchema = new mongoose.Schema({
  title: String, description: String, tags: [String], imageUrl: String, githubUrl: String, demoUrl: String
});
ProjectSchema.set('toJSON', toJSONConfig);
const Project = mongoose.model('Project', ProjectSchema);

const ExperienceSchema = new mongoose.Schema({
  role: String, company: String, duration: String, description: [String], logoUrl: String
});
ExperienceSchema.set('toJSON', toJSONConfig);
const Experience = mongoose.model('Experience', ExperienceSchema);

const SkillSchema = new mongoose.Schema({
  name: { type: String, unique: true }, category: String, icon: String
});
const Skill = mongoose.model('Skill', SkillSchema);

const CertificationSchema = new mongoose.Schema({
  title: String, issuer: String, date: String, image: String, credentialUrl: String
});
CertificationSchema.set('toJSON', toJSONConfig);
const Certification = mongoose.model('Certification', CertificationSchema);

const ContactMessageSchema = new mongoose.Schema({
  name: String, email: String, message: String, date: { type: Date, default: Date.now }
});
ContactMessageSchema.set('toJSON', toJSONConfig);
const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema);

// --- Auth Routes ---

// 1. Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        req.session.isAuthenticated = true;
        req.session.user = { email: ADMIN_EMAIL, role: 'admin' };
        req.session.save((err) => {
            if (err) return res.status(500).json({ error: 'Session save failed' });
            res.json({ success: true, user: req.session.user });
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// 2. Check Status
app.get('/api/auth/user', (req, res) => {
    if (req.session && req.session.isAuthenticated) {
        res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        res.status(401).json({ isAuthenticated: false });
    }
});

// 3. Logout
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.json({ success: true });
    });
});

// --- Data Routes ---

// Projects
app.get('/api/projects', async (req, res) => {
    try { res.json(await Project.find()); } catch(e) { res.status(500).json({error:e.message}); }
});
app.post('/api/projects', checkAuth, async (req, res) => {
    try { res.json(await new Project(req.body).save()); } catch(e) { res.status(400).json({error:e.message}); }
});
app.put('/api/projects/:id', checkAuth, async (req, res) => {
    try { res.json(await Project.findByIdAndUpdate(req.params.id, req.body, {new:true})); } catch(e) { res.status(400).json({error:e.message}); }
});
app.delete('/api/projects/:id', checkAuth, async (req, res) => {
    try { await Project.findByIdAndDelete(req.params.id); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }
});

// Experience
app.get('/api/experience', async (req, res) => { try { res.json(await Experience.find()); } catch(e) { res.status(500).json({error:e.message}); } });
app.post('/api/experience', checkAuth, async (req, res) => { try { res.json(await new Experience(req.body).save()); } catch(e) { res.status(400).json({error:e.message}); } });
app.put('/api/experience/:id', checkAuth, async (req, res) => { try { res.json(await Experience.findByIdAndUpdate(req.params.id, req.body, {new:true})); } catch(e) { res.status(400).json({error:e.message}); } });
app.delete('/api/experience/:id', checkAuth, async (req, res) => { try { await Experience.findByIdAndDelete(req.params.id); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); } });

// Skills
app.get('/api/skills', async (req, res) => { try { res.json(await Skill.find()); } catch(e) { res.status(500).json({error:e.message}); } });
app.post('/api/skills', checkAuth, async (req, res) => { try { res.json(await new Skill(req.body).save()); } catch(e) { res.status(400).json({error:e.message}); } });
app.put('/api/skills/:originalName', checkAuth, async (req, res) => { try { res.json(await Skill.findOneAndUpdate({name:req.params.originalName}, req.body, {new:true})); } catch(e) { res.status(400).json({error:e.message}); } });
app.delete('/api/skills/:name', checkAuth, async (req, res) => { try { await Skill.findOneAndDelete({name:req.params.name}); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); } });

// Certs
app.get('/api/certifications', async (req, res) => { try { res.json(await Certification.find()); } catch(e) { res.status(500).json({error:e.message}); } });
app.post('/api/certifications', checkAuth, async (req, res) => { try { res.json(await new Certification(req.body).save()); } catch(e) { res.status(400).json({error:e.message}); } });
app.put('/api/certifications/:id', checkAuth, async (req, res) => { try { res.json(await Certification.findByIdAndUpdate(req.params.id, req.body, {new:true})); } catch(e) { res.status(400).json({error:e.message}); } });
app.delete('/api/certifications/:id', checkAuth, async (req, res) => { try { await Certification.findByIdAndDelete(req.params.id); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); } });

// Contact
app.get('/api/contact', checkAuth, async (req, res) => { try { res.json(await ContactMessage.find().sort({date:-1})); } catch(e) { res.status(500).json({error:e.message}); } });
app.post('/api/contact', async (req, res) => { try { res.json(await new ContactMessage(req.body).save()); } catch(e) { res.status(400).json({error:e.message}); } });
app.delete('/api/contact/:id', checkAuth, async (req, res) => { try { await ContactMessage.findByIdAndDelete(req.params.id); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); } });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Admin Login enabled for: ${ADMIN_EMAIL}`);
});