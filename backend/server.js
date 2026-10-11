const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { analyzeTransition } = require('../intelligence/transitionEngine');
const { runSimulator } = require('../intelligence/simulatorEngine');
const employees = require('../data/employees.json');
const roles = require('../data/roles.json');
const skills = require('../data/skills.json');
const app = express();
app.use(cors());
app.use(express.json());
const dbPath = path.join(__dirname, '../data/workforce.db');
app.get('/api/market-intelligence', (req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Could not connect to database" });
    }
  });
  const query = `
    SELECT 
      job_title, 
      COUNT(*) as role_count, 
      SUM(num_of_jobs) as total_demand,
      AVG(min_experience) as avg_experience
    FROM data_science_jobs
    GROUP BY job_title
    ORDER BY total_demand DESC
    LIMIT 10
  `;
  db.all(query, [], (err, rows) => {
    db.close();
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const topRoles = rows.map(r => ({
      title: r.job_title,
      demand: r.total_demand,
      avgExperience: Math.round(r.avg_experience * 10) / 10
    }));
    res.json({
      topRoles,
      topSkills: [
        { name: "Python", demand: 85 },
        { name: "Machine Learning", demand: 75 },
        { name: "SQL", demand: 70 },
        { name: "Cloud Architecture", demand: 60 }
      ],
      salaryInsights: [
        { experience: "0-2 Yrs", avgSalary: "8.5L" },
        { experience: "3-5 Yrs", avgSalary: "14.2L" },
        { experience: "5+ Yrs", avgSalary: "22.5L" }
      ]
    });
  });
});
app.get('/api/employees', (req, res) => {
  const emergingRolesList = roles.filter(r => r.aiExposure === 'Low' || r.name.includes('AI') || r.name.includes('Automation'));
  const employeesWithScores = employees.map(e => {
    const currentRoleInfo = roles.find(r => r.name === e.role);
    const targetId = (currentRoleInfo && currentRoleInfo.possibleTransitionRoles[0]) || emergingRolesList[0].id;
    const targetRole = roles.find(r => r.id === targetId);
    let score = 50; 
    if (targetRole) {
      try {
        const tr = analyzeTransition(e.id, targetRole.name);
        score = tr.transitionScore;
      } catch(err) {}
    }
    return { ...e, aiReadiness: score };
  });
  res.json(employeesWithScores);
});
app.get('/api/employees/:id', (req, res) => {
  const employee = employees.find(e => e.id === req.params.id);
  if (employee) res.json(employee);
  else res.status(404).json({ error: "Employee not found" });
});
const { exec } = require('child_process');
app.get('/api/employees/:id/predict', (req, res) => {
  const employee = employees.find(e => e.id === req.params.id);
  if (!employee) return res.status(404).json({ error: "Employee not found" });
  const scriptPath = path.join(__dirname, '../intelligence/predict_employee.py');
  const venvPython = path.join(__dirname, '../intelligence/venv/bin/python');
  const inputData = JSON.stringify(employee);
  exec(`"${venvPython}" "${scriptPath}" '${inputData.replace(/'/g, "'\\''")}'`, (error, stdout, stderr) => {
    if (error) {
      console.error("Prediction Error:", stderr);
      return res.status(500).json({ error: "ML Model Execution Failed" });
    }
    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: "Invalid response from ML script" });
    }
  });
});
app.get('/api/roles', (req, res) => {
  res.json(roles);
});
app.get('/api/roles/:id', (req, res) => {
  const role = roles.find(r => r.id === req.params.id);
  if (role) res.json(role);
  else res.status(404).json({ error: "Role not found" });
});
app.get('/api/skills', (req, res) => {
  res.json(skills);
});
app.post('/api/transition/analyze', (req, res) => {
  try {
    const { employeeId, targetRole } = req.body;
    const result = analyzeTransition(employeeId, targetRole);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.post('/api/simulator/run', (req, res) => {
  const { requiredRoles, strategy } = req.body;
  const results = runSimulator({ requiredRoles, strategy });
  res.json(results);
});
app.get('/api/dashboard/summary', (req, res) => {
  const totalEmployees = employees.length;
  const currentRoles = [...new Set(employees.map(e => e.role))].length;
  const emergingRolesList = roles.filter(r => r.aiExposure === 'Low' || r.name.includes('AI') || r.name.includes('Automation'));
  let readyCount = 0;
  let upskillCount = 0;
  let hireCount = 0;
  const gapMap = {};
  roles.forEach(r => {
    r.emergingSkills.forEach(s => { gapMap[s] = (gapMap[s] || 0) + 2; }); 
  });
  employees.forEach(e => {
    const currentRoleInfo = roles.find(r => r.name === e.role);
    const targetId = (currentRoleInfo && currentRoleInfo.possibleTransitionRoles[0]) || emergingRolesList[0].id;
    const targetRole = roles.find(r => r.id === targetId);
    if (targetRole) {
      try {
        const tr = analyzeTransition(e.id, targetRole.name);
        if (tr.transitionScore >= 70) readyCount++;
        else if (tr.transitionScore >= 40) upskillCount++;
        else hireCount++;
        tr.missingSkills.forEach(ms => {
          gapMap[ms] = (gapMap[ms] || 0) + 1;
        });
      } catch(err) {}
    }
  });
  const total = readyCount + upskillCount + hireCount || 1;
  const readinessData = [
    { name: 'Ready', value: Math.round((readyCount/total)*100) },
    { name: 'Upskill Required', value: Math.round((upskillCount/total)*100) },
    { name: 'Hire Required', value: Math.round((hireCount/total)*100) },
  ];
  const skillGaps = Object.entries(gapMap)
    .map(([name, gap]) => ({ name, gap: gap * 5 })) 
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 5);
  const signals = [
    {
      title: "Demand for Python & Machine Learning",
      description: "Increased rapidly across Data & Engineering departments",
      type: "Emerging",
      severity: "high"
    },
    {
      title: "Manual Test Execution Tasks",
      description: "Decreased due to automation tooling adoption",
      type: "Declining",
      severity: "medium"
    }
  ];
  res.json({
    totalEmployees,
    currentRoles,
    emergingRoles: emergingRolesList.length,
    criticalSkillGaps: skillGaps.length > 0 ? skillGaps[0].gap : 0,
    reskillingCandidates: upskillCount,
    readinessData,
    skillGaps,
    signals
  });
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`WorkforceX API running on port ${PORT}`);
});
