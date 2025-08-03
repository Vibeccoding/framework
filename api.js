// REST API Server for Cognizant Neuro Transition Platform
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory data store (replace with database in production)
let data = {
    projects: [{"id":"PRJ-001","name":"Banking System Transition","status":"active","progress":78,"startDate":"2024-01-01","endDate":"2024-06-30"}],
    assessments: [{"id":"ASS-001","projectId":"PRJ-001","area":"Technical Architecture","status":"complete","score":85,"issues":2,"owner":"Tech Lead"}],
    trainings: [{"id":"TRN-001","projectId":"PRJ-001","topic":"System Architecture","progress":85,"trainer":"Senior Architect","attendees":8}],
    shadows: [{"id":"SHD-001","projectId":"PRJ-001","activity":"Production Support","shadower":"John Doe","expert":"Expert A","progress":75}],
    issues: [{"id":"ISS-001","projectId":"PRJ-001","title":"Database Performance","priority":"critical","status":"open","assignee":"DBA Team"}],
    tickets: [{"id":"TKT-001","projectId":"PRJ-001","title":"Login Issue","priority":"high","status":"in-progress","assignee":"John Doe","customer":"Client A"}],
    surveys: [{"id":"SUR-001","projectId":"PRJ-001","module":"due-diligence","rating":4.2,"responses":8,"client":"Client A"}]
};

// Dashboard API
app.get('/api/dashboard', (req, res) => {
    const stats = {
        totalProjects: data.projects.length,
        totalAssessments: data.assessments.length,
        totalIssues: data.issues.length,
        totalTickets: data.tickets.length,
        avgProgress: data.projects.reduce((sum, p) => sum + p.progress, 0) / data.projects.length,
        avgSurveyRating: data.surveys.reduce((sum, s) => sum + s.rating, 0) / data.surveys.length
    };
    res.json(stats);
});

// Due Diligence APIs
app.get('/api/assessments', (req, res) => res.json(data.assessments));
app.post('/api/assessments', (req, res) => {
    const assessment = { id: `ASS-${Date.now()}`, ...req.body };
    data.assessments.push(assessment);
    res.json(assessment);
});
app.put('/api/assessments/:id', (req, res) => {
    const index = data.assessments.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
        data.assessments[index] = { ...data.assessments[index], ...req.body };
        res.json(data.assessments[index]);
    } else {
        res.status(404).json({ error: 'Assessment not found' });
    }
});

// Knowledge Acquisition APIs
app.get('/api/trainings', (req, res) => res.json(data.trainings));
app.post('/api/trainings', (req, res) => {
    const training = { id: `TRN-${Date.now()}`, ...req.body };
    data.trainings.push(training);
    res.json(training);
});
app.put('/api/trainings/:id', (req, res) => {
    const index = data.trainings.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
        data.trainings[index] = { ...data.trainings[index], ...req.body };
        res.json(data.trainings[index]);
    } else {
        res.status(404).json({ error: 'Training not found' });
    }
});

// Shadow & Reverse Shadow APIs
app.get('/api/shadows', (req, res) => res.json(data.shadows));
app.post('/api/shadows', (req, res) => {
    const shadow = { id: `SHD-${Date.now()}`, ...req.body };
    data.shadows.push(shadow);
    res.json(shadow);
});
app.put('/api/shadows/:id', (req, res) => {
    const index = data.shadows.findIndex(s => s.id === req.params.id);
    if (index !== -1) {
        data.shadows[index] = { ...data.shadows[index], ...req.body };
        res.json(data.shadows[index]);
    } else {
        res.status(404).json({ error: 'Shadow activity not found' });
    }
});

// Stabilization APIs
app.get('/api/issues', (req, res) => res.json(data.issues));
app.post('/api/issues', (req, res) => {
    const issue = { id: `ISS-${Date.now()}`, ...req.body };
    data.issues.push(issue);
    res.json(issue);
});
app.put('/api/issues/:id', (req, res) => {
    const index = data.issues.findIndex(i => i.id === req.params.id);
    if (index !== -1) {
        data.issues[index] = { ...data.issues[index], ...req.body };
        res.json(data.issues[index]);
    } else {
        res.status(404).json({ error: 'Issue not found' });
    }
});

// Steady Support APIs
app.get('/api/tickets', (req, res) => res.json(data.tickets));
app.post('/api/tickets', (req, res) => {
    const ticket = { id: `TKT-${Date.now()}`, ...req.body };
    data.tickets.push(ticket);
    res.json(ticket);
});
app.put('/api/tickets/:id', (req, res) => {
    const index = data.tickets.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
        data.tickets[index] = { ...data.tickets[index], ...req.body };
        res.json(data.tickets[index]);
    } else {
        res.status(404).json({ error: 'Ticket not found' });
    }
});

// Client Survey APIs
app.get('/api/surveys', (req, res) => res.json(data.surveys));
app.post('/api/surveys', (req, res) => {
    const survey = { id: `SUR-${Date.now()}`, ...req.body };
    data.surveys.push(survey);
    res.json(survey);
});
app.put('/api/surveys/:id', (req, res) => {
    const index = data.surveys.findIndex(s => s.id === req.params.id);
    if (index !== -1) {
        data.surveys[index] = { ...data.surveys[index], ...req.body };
        res.json(data.surveys[index]);
    } else {
        res.status(404).json({ error: 'Survey not found' });
    }
});

// Projects API
app.get('/api/projects', (req, res) => res.json(data.projects));
app.post('/api/projects', (req, res) => {
    const project = { id: `PRJ-${Date.now()}`, ...req.body };
    data.projects.push(project);
    res.json(project);
});

app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('GET /api/dashboard - Dashboard statistics');
    console.log('GET/POST/PUT /api/assessments - Due Diligence');
    console.log('GET/POST/PUT /api/trainings - Knowledge Acquisition');
    console.log('GET/POST/PUT /api/shadows - Shadow Activities');
    console.log('GET/POST/PUT /api/issues - Stabilization Issues');
    console.log('GET/POST/PUT /api/tickets - Support Tickets');
    console.log('GET/POST/PUT /api/surveys - Client Surveys');
    console.log('GET/POST /api/projects - Projects');
});