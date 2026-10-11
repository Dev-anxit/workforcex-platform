function runSimulator({ requiredRoles, strategy, currentWorkforce, transitionScores }) {
  const results = {
    capabilityCoverage: 0,
    skillGapsRemaining: 0,
    trainingTimeWeeks: 0,
    externalHiringRequirement: 0,
    budgetRequired: 0,
  };
  const scalePenalty = Math.floor(requiredRoles / 100); 
  if (strategy === 'BUILD') {
    results.capabilityCoverage = Math.max(50, 85 - (scalePenalty * 3)); 
    results.skillGapsRemaining = 100 - results.capabilityCoverage;
    results.trainingTimeWeeks = 12 + Math.floor(scalePenalty / 2);
    results.externalHiringRequirement = Math.floor(requiredRoles * 0.2);
    results.budgetRequired = requiredRoles * 5000;
  } else if (strategy === 'BUY') {
    results.capabilityCoverage = Math.max(75, 98 - (scale/Penalty * 2) || 98 - (scalePenalty * 2));
    results.skillGapsRemaining = 100 - results.capabilityCoverage;
    results.trainingTimeWeeks = 2 + scalePenalty;
    results.externalHiringRequirement = requiredRoles;
    results.budgetRequired = requiredRoles * 20000;
  } else if (strategy === 'REDEPLOY') {
    results.capabilityCoverage = Math.max(30, 65 - (scalePenalty * 4));
    results.skillGapsRemaining = 100 - results.capabilityCoverage;
    results.trainingTimeWeeks = 16 + scalePenalty;
    results.externalHiringRequirement = Math.floor(requiredRoles * 0.4);
    results.budgetRequired = requiredRoles * 8000;
  } else if (strategy === 'AUTOMATE') {
    results.capabilityCoverage = Math.min(95, 70 + (scalePenalty * 2));
    results.skillGapsRemaining = 100 - results.capabilityCoverage; 
    results.trainingTimeWeeks = 24; 
    results.externalHiringRequirement = Math.floor(requiredRoles * 0.1);
    results.budgetRequired = 50000 + (requiredRoles * 2000); 
  }
  return results;
}
module.exports = { runSimulator };
