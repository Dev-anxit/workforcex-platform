const fs = require('fs');
const path = require('path');
const employees = require('../data/employees.json');
const roles = require('../data/roles.json');
const skills = require('../data/skills.json');
function analyzeTransition(employeeId, targetRoleName) {
  const employee = employees.find(e => e.id === employeeId);
  const targetRole = roles.find(r => r.name === targetRoleName);
  if (!employee || !targetRole) {
    throw new Error('Employee or Target Role not found.');
  }
  const employeeSkills = employee.skills.map(s => s.name);
  const targetSkills = targetRole.requiredSkills;
  const matchedSkills = targetSkills.filter(s => employeeSkills.includes(s));
  const missingSkills = targetSkills.filter(s => !employeeSkills.includes(s));
  const transitionScore = Math.round((matchedSkills.length / targetSkills.length) * 100);
  let difficulty = 'Low';
  if (transitionScore < 40) difficulty = 'High';
  else if (transitionScore < 70) difficulty = 'Medium';
  let adjacentSkills = [];
  missingSkills.forEach(missingSkill => {
    const skillData = skills.find(s => s.name === missingSkill);
    if (skillData && skillData.relatedSkills) {
      const matchingAdjacents = skillData.relatedSkills.filter(rs => employeeSkills.includes(rs));
      if (matchingAdjacents.length > 0) {
        adjacentSkills.push({
          target: missingSkill,
          from: matchingAdjacents[0]
        });
      }
    }
  });
  const recommendedPath = [];
  if (missingSkills.length > 0) {
    recommendedPath.push(employee.role);
    adjacentSkills.forEach(adj => {
      if (!recommendedPath.includes(adj.from)) recommendedPath.push(adj.from);
      recommendedPath.push(adj.target);
    });
    missingSkills.forEach(ms => {
      if (!adjacentSkills.find(a => a.target === ms) && !recommendedPath.includes(ms)) {
        recommendedPath.push(ms);
      }
    });
    recommendedPath.push(targetRole.name);
  } else {
    recommendedPath.push(employee.role, targetRole.name);
  }
  return {
    transitionScore,
    difficulty,
    matchedSkills,
    missingSkills,
    adjacentSkills,
    recommendedPath
  };
}
module.exports = {
  analyzeTransition
};
