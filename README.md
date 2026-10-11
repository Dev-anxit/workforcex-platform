# WorkforceX

**"Understand the change. Model the transition. Build the workforce ahead."**

WorkforceX is an AI Workforce Transformation & Reskilling Intelligence platform designed to help organizations understand how AI and technology are changing work, and how their existing workforce can transition into emerging roles.

## Project Structure

```text
workforcex/
├── frontend/         # React, Vite, Tailwind CSS, Recharts
├── backend/          # Node.js, Express REST API
├── intelligence/     # Core algorithms for skill matching and transition scenarios
└── data/             # Local datasets for the prototype
```

## Features

1. **Executive Dashboard**: High-level view of workforce readiness, skill gaps, and emerging roles.
2. **Workforce X-Ray**: Detailed view of employees, their skills, and AI exposure.
3. **Skill Transformation Map**: Visualizing how tasks and skills are evolving in specific roles.
4. **Transition Graph**: Interactive engine to calculate transition scores and pathways between an employee's current skills and a target role.
5. **Workforce Simulator**: Compare Build (reskill), Buy (hire), Redeploy, and Automate strategies based on future capability requirements.
6. **Role Intelligence**: Deep dive into occupation profiles and highly automatable vs human-intensive tasks.

## How the Transition Score Works

The prototype transition algorithm uses a transparent deterministic scoring model:
`Transition Score = (Matched Required Skills / Total Required Skills) * 100`

It also calculates:
- **Missing Skills**: Target skills not currently possessed by the employee.
- **Adjacent Skills**: Existing skills that have a relationship to missing target skills (e.g., Python -> Selenium).
- **Recommended Pathway**: A step-by-step learning journey from current role to target role.

*Note: All transition algorithms and data points in this prototype are illustrative and meant for demonstration purposes. They are not guaranteed predictive AI models.*

## Setup & Run Instructions

### 1. Backend Server

```bash
cd backend
npm install
npm run start # or node server.js
```
The backend API runs on `http://localhost:5000`

### 2. Frontend Application

```bash
cd frontend
npm install
npm run dev
```
The frontend will typically run on `http://localhost:5173`

## Architecture Extensibility
While this prototype uses local JSON data, the architecture is designed to support:
- PostgreSQL / MongoDB integration
- Real-time O*NET / ESCO API integrations
- Vector embeddings and Knowledge Graphs for semantic skill matching

## Disclaimer
This is a decision-support prototype built for a hackathon. It does not replace human HR review and all presented calculations should be considered illustrative.
