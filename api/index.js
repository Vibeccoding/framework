// Vercel Serverless Function for API
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store
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
app.get('/dashboard', (req, res) => {
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

// CRUD APIs
const endpoints = ['assessments', 'trainings', 'shadows', 'issues', 'tickets', 'surveys', 'projects'];

endpoints.forEach(endpoint => {
    app.get(`/${endpoint}`, (req, res) => res.json(data[endpoint]));
    
    app.post(`/${endpoint}`, (req, res) => {
        const item = { id: `${endpoint.toUpperCase().slice(0,3)}-${Date.now()}`, ...req.body };
        data[endpoint].push(item);
        res.json(item);
    });
    
    app.put(`/${endpoint}/:id`, (req, res) => {
        const index = data[endpoint].findIndex(item => item.id === req.params.id);
        if (index !== -1) {
            data[endpoint][index] = { ...data[endpoint][index], ...req.body };
            res.json(data[endpoint][index]);
        } else {
            res.status(404).json({ error: `${endpoint} not found` });
        }
    });
});

module.exports = (req, res) => {
    app(req, res);
};