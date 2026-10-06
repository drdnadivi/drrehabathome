import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');
const INITIAL_DATA_FILE = path.join(__dirname, 'initialData.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper to initialize and read DB
function loadDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
      fs.writeFileSync(DB_FILE, initial, 'utf-8');
      return JSON.parse(initial);
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading DB, restoring from initialData:', err);
    const initial = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
    fs.writeFileSync(DB_FILE, initial, 'utf-8');
    return JSON.parse(initial);
  }
}

function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving DB:', err);
  }
}

// Ensure DB exists on startup
loadDb();

// ---------------- API ROUTES ----------------

app.get('/api/stats', (req, res) => {
  const db = loadDb();
  const totalSessions = db.sessions.length;
  const reviewedSessions = db.sessions.filter(s => s.pmrDoctorStatus === 'reviewed').length;
  const pendingReviews = db.sessions.filter(s => s.pmrDoctorStatus === 'pending_review').length;
  const activePatients = db.patients.filter(p => p.status === 'Active Recovery').length;
  const avgRecoveryScore = Math.round(
    db.patients.reduce((acc, p) => acc + (p.recoveryScore || 0), 0) / (db.patients.length || 1)
  );

  res.json({
    totalPatients: db.patients.length,
    activePatients,
    totalSessions,
    reviewedSessions,
    pendingReviews,
    doctorReviewRate: `${Math.round((reviewedSessions / (totalSessions || 1)) * 100)}%`,
    avgRecoveryScore: `${avgRecoveryScore}%`,
    totalBlogs: db.blogs.length,
    totalBookings: db.bookings.length
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = loadDb();
  const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());

  if (!user || (password && user.password !== password && password !== 'demo123')) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const safeUser = { ...user };
  delete safeUser.password;
  res.json({
    token: `pmr-token-${user.id}-${Date.now()}`,
    user: safeUser
  });
});

app.get('/api/users', (req, res) => {
  const db = loadDb();
  const safeUsers = db.users.map(u => {
    const s = { ...u };
    delete s.password;
    return s;
  });
  res.json(safeUsers);
});

app.get('/api/blogs', (req, res) => {
  const db = loadDb();
  const { category, search, tag } = req.query;
  let list = [...db.blogs];

  if (category && category !== 'All') {
    list = list.filter(b => b.category.toLowerCase() === category.toLowerCase());
  }

  if (tag) {
    list = list.filter(b => b.tags && b.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.content.toLowerCase().includes(q)
    );
  }

  res.json(list);
});

app.get('/api/blogs/:idOrSlug', (req, res) => {
  const db = loadDb();
  const param = req.params.idOrSlug;
  const blog = db.blogs.find(b => b.id === param || b.slug === param);

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  blog.views = (blog.views || 0) + 1;
  saveDb(db);

  res.json(blog);
});

app.post('/api/blogs', (req, res) => {
  const db = loadDb();
  const { title, summary, content, category, authorName, authorTitle, coverImage, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const id = `blog-${Date.now()}`;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const newBlog = {
    id,
    slug,
    title,
    category: category || 'PMR & Physiatry',
    readTime: `${Math.max(3, Math.ceil(content.split(' ').length / 180))} min read`,
    publishedAt: new Date().toISOString().split('T')[0],
    author: {
      name: authorName || 'Dr. Dharshan N A, MD (PMR)',
      title: authorTitle || 'Lead PMR Specialist',
      avatar: '/dr-dharshan.jpg'
    },
    coverImage: coverImage || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    summary: summary || title,
    content,
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : ['Rehab', 'PMR']),
    views: 1,
    featured: false,
    comments: []
  };

  db.blogs.unshift(newBlog);
  saveDb(db);
  res.status(201).json(newBlog);
});

app.put('/api/blogs/:id', (req, res) => {
  const db = loadDb();
  const index = db.blogs.findIndex(b => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  const existing = db.blogs[index];
  const updated = {
    ...existing,
    ...req.body,
    id: existing.id,
    updatedAt: new Date().toISOString()
  };

  db.blogs[index] = updated;
  saveDb(db);
  res.json(updated);
});

app.delete('/api/blogs/:id', (req, res) => {
  const db = loadDb();
  const initialLength = db.blogs.length;
  db.blogs = db.blogs.filter(b => b.id !== req.params.id);

  if (db.blogs.length === initialLength) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  saveDb(db);
  res.json({ success: true, message: 'Blog deleted successfully' });
});

app.post('/api/blogs/:id/comments', (req, res) => {
  const db = loadDb();
  const blog = db.blogs.find(b => b.id === req.params.id || b.slug === req.params.id);

  if (!blog) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  const { author, text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Comment text is required' });
  }

  const newComment = {
    id: `c-${Date.now()}`,
    author: author || 'Anonymous Patient / Reader',
    date: new Date().toISOString().split('T')[0],
    text
  };

  if (!blog.comments) blog.comments = [];
  blog.comments.push(newComment);
  saveDb(db);

  res.status(201).json(newComment);
});

app.get('/api/patients', (req, res) => {
  const db = loadDb();
  res.json(db.patients);
});

app.get('/api/patients/:id', (req, res) => {
  const db = loadDb();
  const patient = db.patients.find(p => p.id === req.params.id);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });

  const sessions = db.sessions.filter(s => s.patientId === patient.id).sort((a, b) => b.sessionNumber - a.sessionNumber);
  const exercises = db.exercises.filter(e => e.patientId === patient.id);

  res.json({
    ...patient,
    sessions,
    exercises
  });
});

app.put('/api/patients/:id', (req, res) => {
  const db = loadDb();
  const index = db.patients.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Patient not found' });

  db.patients[index] = { ...db.patients[index], ...req.body };
  saveDb(db);
  res.json(db.patients[index]);
});

app.get('/api/sessions', (req, res) => {
  const db = loadDb();
  const { patientId, status } = req.query;
  let list = [...db.sessions];

  if (patientId) {
    list = list.filter(s => s.patientId === patientId);
  }

  if (status) {
    list = list.filter(s => s.pmrDoctorStatus === status);
  }

  list.sort((a, b) => (b.sessionNumber || 0) - (a.sessionNumber || 0));
  res.json(list);
});

app.post('/api/sessions', (req, res) => {
  const db = loadDb();
  const {
    patientId,
    patientName,
    vitals,
    painScoreVAS,
    romMeasurements,
    exercisesPerformed,
    functionalMobility,
    therapistNotes,
    flaggedUrgent,
    complianceRate
  } = req.body;

  if (!patientId) {
    return res.status(400).json({ error: 'patientId is required' });
  }

  const patient = db.patients.find(p => p.id === patientId);
  const existingPatientSessions = db.sessions.filter(s => s.patientId === patientId);
  const nextSessionNumber = existingPatientSessions.length + 1;

  const newSession = {
    id: `ses-${patientId.replace('pat-', '')}-${String(nextSessionNumber).padStart(2, '0')}`,
    patientId,
    patientName: patientName || (patient ? patient.name : 'Patient'),
    sessionNumber: nextSessionNumber,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    therapistName: req.body.therapistName || 'PT Rahul Sharma, MPT',
    vitals: vitals || { bp: '124/80 mmHg', pulse: '76 bpm', spo2: '99%' },
    painScoreVAS: Number(painScoreVAS) || 3,
    romMeasurements: romMeasurements || {},
    exercisesPerformed: Array.isArray(exercisesPerformed) ? exercisesPerformed : [exercisesPerformed || 'General therapeutic protocol'],
    functionalMobility: functionalMobility || 'Gait and transfer drills tolerated well.',
    therapistNotes: therapistNotes || 'Session executed smoothly as per plan.',
    pmrDoctorStatus: 'pending_review',
    pmrDoctorName: patient?.assignedDoctor || 'Dr. Dharshan N A, MD (PMR)',
    pmrDoctorNotes: '',
    pmrDoctorAction: 'Pending PMR Doctor clinical evaluation & sign-off',
    flaggedUrgent: Boolean(flaggedUrgent),
    complianceRate: complianceRate || '100%'
  };

  db.sessions.unshift(newSession);

  if (patient) {
    patient.sessionsCompleted = (patient.sessionsCompleted || 0) + 1;
    patient.currentVAS = Number(painScoreVAS);
    if (romMeasurements && Object.keys(romMeasurements).length > 0) {
      const romKey = Object.keys(romMeasurements)[0];
      patient.currentROM = `${romKey.replace(/([A-Z])/g, ' $1').trim()}: ${romMeasurements[romKey]}`;
    }
    patient.recoveryScore = Math.min(98, (patient.recoveryScore || 60) + 3);
  }

  saveDb(db);
  res.status(201).json(newSession);
});

app.put('/api/sessions/:id/review', (req, res) => {
  const db = loadDb();
  const session = db.sessions.find(s => s.id === req.params.id);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const { pmrDoctorNotes, pmrDoctorAction, doctorName } = req.body;

  session.pmrDoctorStatus = 'reviewed';
  session.pmrDoctorReviewedAt = new Date().toISOString();
  session.pmrDoctorName = doctorName || session.pmrDoctorName || 'Dr. Dharshan N A, MD (PMR)';
  session.pmrDoctorNotes = pmrDoctorNotes || 'Clinical metrics reviewed. Patient progressing favorably along rehabilitation trajectory.';
  session.pmrDoctorAction = pmrDoctorAction || 'Approved without protocol modifications';

  saveDb(db);
  res.json(session);
});

app.get('/api/exercises', (req, res) => {
  const db = loadDb();
  const { patientId } = req.query;
  let list = db.exercises;
  if (patientId) list = list.filter(e => e.patientId === patientId);
  res.json(list);
});

app.put('/api/exercises/:id/toggle', (req, res) => {
  const db = loadDb();
  const ex = db.exercises.find(e => e.id === req.params.id);
  if (!ex) return res.status(404).json({ error: 'Exercise not found' });

  ex.completedToday = !ex.completedToday;
  saveDb(db);
  res.json(ex);
});

app.post('/api/exercises', (req, res) => {
  const db = loadDb();
  const { patientId, title, category, frequency, sets, reps, targetMuscle, instructions, precautions, doctorPrescriptionNote } = req.body;

  if (!patientId || !title) {
    return res.status(400).json({ error: 'Patient ID and Title are required' });
  }

  const newEx = {
    id: `ex-${Date.now()}`,
    patientId,
    title,
    category: category || 'Therapeutic Exercise',
    frequency: frequency || 'Twice daily',
    sets: sets || '3 sets',
    reps: reps || '10 reps',
    targetMuscle: targetMuscle || 'Target Muscle Group',
    instructions: instructions || '',
    precautions: precautions || 'Stop if sharp pain arises',
    completedToday: false,
    doctorPrescriptionNote: doctorPrescriptionNote || 'Prescribed by PMR Physician'
  };

  db.exercises.push(newEx);
  saveDb(db);
  res.status(201).json(newEx);
});

app.get('/api/bookings', (req, res) => {
  const db = loadDb();
  res.json(db.bookings);
});

app.post('/api/bookings', (req, res) => {
  const db = loadDb();
  const { patientName, phone, email, serviceType, address, preferredDate, preferredSlot, doctorConsultation, symptoms } = req.body;

  if (!patientName || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const newBooking = {
    id: `bk-${Date.now()}`,
    patientName,
    phone,
    email: email || '',
    serviceType: serviceType || 'Post-Operative Orthopedic Care',
    address: address || '',
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    preferredSlot: preferredSlot || 'Morning (09:00 AM - 12:00 PM)',
    doctorConsultation: doctorConsultation || 'In-Home PT Visit + Dr. Dharshan PMR Review & Blueprint',
    symptoms: symptoms || '',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  db.bookings.unshift(newBooking);
  saveDb(db);
  res.status(201).json(newBooking);
});

app.put('/api/bookings/:id/status', (req, res) => {
  const db = loadDb();
  const bk = db.bookings.find(b => b.id === req.params.id);
  if (!bk) return res.status(404).json({ error: 'Booking not found' });

  bk.status = req.body.status || bk.status;
  saveDb(db);
  res.json(bk);
});

app.post('/api/reset', (req, res) => {
  try {
    const initial = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
    fs.writeFileSync(DB_FILE, initial, 'utf-8');
    res.json({ success: true, message: 'Database reset to initial demo state' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset database' });
  }
});

app.get('/dr-dharshan.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'dr-dharshan.jpg'));
});

const distPath = fs.existsSync(path.join(__dirname, 'dist'))
  ? path.join(__dirname, 'dist')
  : path.join(__dirname, 'static_build');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`DrRehabAtHome API Server listening on port ${PORT}`);
});
